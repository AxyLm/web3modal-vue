import { ethers } from 'ethers';
import { EvmChainParameter, getEvmChainParameter } from '~/constants';
import { ChainIds } from '~/constants/enums/chain-id';

/**
 * MetaMask
 * Docs: https://docs.metamask.io/guide/ethereum-provider.html
 * JSON RPC API: https://metamask.github.io/api-playground/api-documentation
 */
export interface MetaMaskProvider extends MetaMaskEthereumProvider {
  isMetaMask: boolean;
  providers?: MetaMaskProvider[];
  isConnected: () => boolean;
  request: (request: { method: string; params?: any[] | undefined }) => Promise<any>;
  selectedAddress: string;
}

/**
 * source: @metamask/detect-provider
 * https://github.com/MetaMask/detect-provider/blob/main/src/index.ts
 */
export interface MetaMaskEthereumProvider {
  isMetaMask?: boolean;
  once(eventName: string | symbol, listener: (...args: any[]) => void): this;
  on(eventName: string | symbol, listener: (...args: any[]) => void): this;
  off(eventName: string | symbol, listener: (...args: any[]) => void): this;
  addListener(eventName: string | symbol, listener: (...args: any[]) => void): this;
  removeListener(eventName: string | symbol, listener: (...args: any[]) => void): this;
  removeAllListeners(event?: string | symbol): this;
}

export interface Window {
  ethereum?: MetaMaskProvider;
}

export const ethereum = (window as Window).ethereum;

class ProviderNotFoundError extends Error {
  constructor() {
    super('Not found provider');
  }
}

export class MetaMaskConnector {
  provider: ethers.providers.Web3Provider;

  #onDisconnectHandler?: (error: unknown) => void;
  #onAccountsChangedHandler?: (accounts: string[]) => void;
  #onChainChangedHandler?: (chainId: string) => void;

  constructor() {
    if (typeof window !== 'undefined' && !!ethereum) {
      const _provider = new ethers.providers.Web3Provider(ethereum);
      this.provider = _provider;
      ethereum.removeAllListeners();
    } else {
      throw new ProviderNotFoundError();
    }
  }

  async connect() {
    if (!this.provider) {
      throw new ProviderNotFoundError();
    }
    const accounts: string[] = await this.provider.send('eth_requestAccounts', []);

    return {
      accounts,
      provider: this.provider,
    };
  }

  async isConnected() {
    const accounts: string[] = await this.provider.send('eth_accounts', []);
    return accounts;
  }

  /**
   * @note MetaMask disconnect event would be triggered when the specific chain changed (like L2 network),
   * and will not be triggered when a user clicked disconnect in wallet...
   */
  onDisconnect(handler: (error: unknown) => void) {
    if (!this.provider) throw new ProviderNotFoundError();
    if (this.#onDisconnectHandler) {
      this.#removeListener('disconnect', this.#onDisconnectHandler);
    }
    this.#onDisconnectHandler = handler;
    ethereum!.on('disconnect', handler);
  }

  onAccountsChanged(handler: (accounts: string[]) => void) {
    if (!this.provider) throw new ProviderNotFoundError();
    if (this.#onAccountsChangedHandler) {
      this.#removeListener('accountsChanged', this.#onAccountsChangedHandler);
    }
    this.#onAccountsChangedHandler = handler;
    ethereum!.on('accountsChanged', handler);
  }

  onChainChanged(handler: (chainId: string) => void) {
    if (!this.provider) throw new ProviderNotFoundError();
    this.#onChainChangedHandler = handler;
    ethereum!.on('chainChanged', (chainId: string) => {
      console.log(chainId);
      this.provider = new ethers.providers.Web3Provider(ethereum!);
      handler(chainId);
    });
  }

  #removeListener(event: string, handler: (...args: any[]) => void) {
    if (!this.provider) throw new ProviderNotFoundError();
    ethereum!.removeListener(event, handler);
  }

  async switchChain(chainId: ChainIds) {
    // TODO:
    if (!this.provider) throw new ProviderNotFoundError();
    const evmParameter = getEvmChainParameter(chainId);

    try {
      await this.provider.send('wallet_switchEthereumChain', [{ chainId: evmParameter.chainId }]);
    } catch (err: any) {
      if (err.code === 4902) {
        try {
          const evmParameter = getEvmChainParameter(chainId);

          await this.addChain(evmParameter);
        } catch (err: unknown) {
          console.error(err);
        }
      }
    }
  }

  async addChain(networkDetails: EvmChainParameter) {
    if (!this.provider) throw new ProviderNotFoundError();
    try {
      this.provider.send('wallet_addEthereumChain', [networkDetails]);
    } catch (err: unknown) {
      throw Error('wallet_addEthereumChain \n');
    }
  }
}
