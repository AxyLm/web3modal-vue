import { ethers } from 'ethers';
import { isReactive, readonly, shallowRef } from 'vue';
import { getEvmChainParameter } from '~/constants';
import { ChainIds } from '~/constants/enums/chain-id';

/**
 * @private
 */
const provider = shallowRef<Provder>();

type Provder = ethers.providers.JsonRpcProvider;

// type useProvider = [typeof _provider, (provider: ethers.providers.Web3Provider | undefined) => void];
export const useProvider = () => {
  const setProvider = (_provider: Provder | undefined) => {
    provider.value = _provider;
  };

  return {
    provider,
    setProvider,
  };
};

/**
 * getProvider
 * @description get connected or custom provider
 * @returns Provder
 */
export function getProvider(): ethers.providers.Web3Provider;
export function getProvider(chainId: ChainIds): Provder;
export function getProvider(chainId: string): Provder;
export function getProvider(chainId?: ChainIds | string | undefined): Provder | undefined {
  const { provider } = useProvider();
  if (!chainId) {
    return provider.value; // ?? ethers.providers.getDefaultProvider();
  }
  const EvmChainParameter = getEvmChainParameter(chainId);
  if (!EvmChainParameter) {
    throw Error(` Not found this chainId: ${chainId}`);
  } else {
    // TODO: rpc retry
    const _provider = new ethers.providers.JsonRpcProvider(
      EvmChainParameter.rpcUrls[EvmChainParameter.rpcUrls.length - 1],
    );
    return _provider;
  }
}
