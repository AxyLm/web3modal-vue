import { getProvider } from '~/composables/use-provider';
import { getEvmChainParameter, EvmChainParameter } from '~/constants';
import { ChainIds } from '~/constants/enums/chain-id';

export async function switchChain(chainId: ChainIds) {
  // TODO:
  const evmParameter = getEvmChainParameter(chainId);

  const provider = getProvider();
  console.log(provider);
  try {
    await provider.send('wallet_switchEthereumChain', [{ chainId: evmParameter.chainId }]);
  } catch (err: any) {
    if (err.code === 4902) {
      try {
        const evmParameter = getEvmChainParameter(chainId);

        await addChain(evmParameter);
      } catch (err: unknown) {
        // if (this.#isUserRejectedRequestError(err)) {
        //   throw new UserRejectedRequestError(err);
        // }
        // throw new AddChainError();
      }
    }
    console.log(err);

    // if (this.#isUserRejectedRequestError(err)) {
    //   throw new UserRejectedRequestError(err);
    // }
    // throw new SwitchChainError(err);
  }
}

export async function addChain(networkDetails: EvmChainParameter) {
  const provider = getProvider();

  try {
    await provider.send('wallet_addEthereumChain', [networkDetails]);
  } catch (err: unknown) {
    throw Error('wallet_addEthereumChain \n');
  }
}
