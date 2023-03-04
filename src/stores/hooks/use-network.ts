import { defineStore } from 'pinia';
import { computed, ref, watchEffect } from 'vue';
import { useProvider } from '~/composables/use-provider';
import { EvmChainParameter, getEvmChainParameter } from '~/constants';
import { ChainIds } from '~/constants/enums/chain-id';

export const useConnectedNetwork = defineStore('useConnectedNetwork', () => {
  const { provider } = useProvider();

  const network = ref<EvmChainParameter>();
  const setNetwork = (chainId: string | number | ChainIds) => {
    const evmParameter = getEvmChainParameter(chainId);
    if (evmParameter) {
      network.value = evmParameter;
    } else if (provider.value) {
      network.value = {
        chainId: `0x${Number(provider.value.network.chainId).toString(16)}`,
        chainName: provider.value.network.name,
        nativeCurrency: {
          name: '',
          symbol: '',
          decimals: 18,
        },
        rpcUrls: [],
        blockExplorerUrls: [],
        iconUrls: [],
      };
    }
  };

  const updateNetwork = () => {
    if (!provider.value) return false;
    return provider.value.getNetwork().then(({ chainId }) => {
      setNetwork(chainId);
    });
  };

  const chainId = computed(() => network.value && Number(network.value.chainId));

  return { network, chainId, updateNetwork, setNetwork };
});
