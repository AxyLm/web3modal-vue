<template>
  <div class="pt-30 wallet max-w-md">
    <div
      class="grid grid-cols-1 gap-4 rounded-lg p-4 pb-10 text-base-2 dark:bg-base-11 dark:text-base-2"
    >
      <p class="text-xl">
        <span>{{ account ? 'Account' : 'Please Connect' }}</span> <br class="block sm:hidden" />
        <span class="text-xs text-white/60">{{ account }}</span>
      </p>
      <div class="mt-4 grid gap-4">
        <!-- <button
          class="dark:hover:bg-gmx-600 no-animation btn-md btn justify-center rounded-sm border bg-transparent px-2 text-md dark:border-white/20"
          @click="connect('inject')"
        >
          <span> MetaMask </span>
        </button> -->

        <div class="mx-auto">
          <button
            class="dark:hover:bg-gmx-600 no-animation btn-md btn justify-center rounded-sm border bg-transparent px-6 text-md dark:border-white/20"
            :class="{ loading: loading }"
            @click="connect('wallet-connect')"
          >
            <WalletConnectIcon class="mr-4 h-8 w-8" />
            <span> Wallet Connect </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Wallet, ethers } from 'ethers';
  import { computed, defineComponent, ref, shallowRef } from 'vue';
  import { useDebounceFn } from '@vueuse/core';

  import { useQRCode } from '@vueuse/integrations/useQRCode';
  import { MetaMaskConnector, WalletConnectConnector, ethereum } from '~/modules/connector';
  import { useProvider } from '~/composables/use-provider';
  import { EthereumStore, IConnector, useEthereumStore } from '~/stores/ethereum.store';
  import { useConnectedNetwork } from '~/stores/hooks/use-network';
  import { mapState } from 'pinia';
  import WalletConnectIcon from '~icons/logo/wallet-connect.svg';
  const walletconnect = new WalletConnectConnector();
  const inject = ethereum ? new MetaMaskConnector() : undefined;

  export default defineComponent({
    components: { WalletConnectIcon },
    setup() {
      const { ethereumStore, ethereumState } = useEthereumStore();
      const networkStore = useConnectedNetwork();
      const { provider: globalProvider, setProvider } = useProvider();

      const loading = ref(false);
      const connect = (type: string) => {
        console.log(type);
        switch (type) {
          case 'wallet-connect':
            loading.value = true;

            walletconnect
              .connect()
              .then((e) => {
                setAccount(e);
                ethereumState.connector.value = IConnector.walletconnect;
              })
              .finally(() => {
                loading.value = false;
              });
            break;
          case 'inject':
            inject
              ?.connect()
              .then(async (e) => {
                setAccount(e);
                ethereumState.connector.value = IConnector.metamask;
              })
              .catch((e) => {
                console.log(e);
              });
            break;
          default:
            break;
        }
      };
      const setAccount = async (opt: {
        accounts: string[];
        provider: ethers.providers.Web3Provider;
      }) => {
        const { accounts, provider } = opt;
        if (accounts[0]) {
          setProvider(provider);
          ethereumState.account.value = accounts[0];
          const network = await provider.getNetwork();
          networkStore.setNetwork(network.chainId);
        }
      };
      return {
        loading,
        connect,
      };
    },
    computed: {
      ...mapState(EthereumStore, ['account']),
    },
  });
</script>

<style scoped lang="less"></style>
