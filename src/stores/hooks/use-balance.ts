import { ethers } from 'ethers';
import { defineStore, storeToRefs } from 'pinia';
import { ref, watchEffect } from 'vue';
import { getProvider, useProvider } from '~/composables/use-provider';
import { EthereumStore } from '~/stores/ethereum.store';
import { useConnectedNetwork } from './use-network';

export const useBalance = defineStore('useAccountBalance', () => {
  const ethereum = EthereumStore();
  const { provider } = useProvider();

  const connectNetwork = useConnectedNetwork();
  const networkState = storeToRefs(connectNetwork);

  const balance = ref<string>();
  watchEffect(() => {
    if (ethereum.account && networkState.network.value?.chainId) {
      updateAccountBalance();
    }
  });

  const updateAccountBalance = async () => {
    if (!ethereum.account || !networkState.network.value?.chainId) return;
    await getProvider()
      .getBalance(ethereum.account)
      .then((e) => {
        balance.value = ethers.utils.formatUnits(e);
      })
      .catch((e) => {
        console.log(e);
        balance.value = undefined;
      });
  };

  return { balance, updateAccountBalance };
});
