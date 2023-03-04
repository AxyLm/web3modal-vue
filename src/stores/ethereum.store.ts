import { defineStore, storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useBalance } from '~/stores/hooks/use-balance';
import { useConnectedNetwork } from '~/stores/hooks/use-network';

export enum IConnector {
  metamask = 'MetaMask',
  walletconnect = 'WalletConnect',
}
export const EthereumStore = defineStore('EthereumStore', () => {
  const account = ref<string>();
  const connector = ref<IConnector>();

  const connectNetwork = useConnectedNetwork();
  const { network, chainId } = storeToRefs(connectNetwork);

  const balanceStore = useBalance();
  const { balance } = storeToRefs(balanceStore);

  const reset = () => {
    account.value = undefined;
    balance.value = undefined;
    connectNetwork.network = undefined;
  };

  const accountConnected = computed(() => {
    if (account.value && network.value?.chainId) {
      return `${account.value}-${Number(network.value?.chainId)}`;
    }
    return false;
  });

  return {
    connector,
    accountConnected,
    network,
    chainId,
    account,
    balance,
    reset,
  };
});

export const useEthereumStore = () => {
  const ethereumStore = EthereumStore();
  const ethereumState = storeToRefs(ethereumStore);

  return {
    ethereumStore,
    ethereumState,
  };
};
