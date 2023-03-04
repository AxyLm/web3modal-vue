<template>
  <header
    class="header sticky inset-x-0 top-0 z-20 flex items-center justify-between border-b border-b-white/5 px-4 sm:h-20 sm:px-7.5 xl:px-10"
  >
    <div class="flex w-full items-center justify-between gap-2">
      <router-link to="/">
        <Favicon class="h-6 w-6" />
      </router-link>
      <span class="text-2xl text-white/80">Moseu</span>
      <a href="https://github.com/AxyLm/web3modal-vue" target="_blank" class="block">
        <icon-carbon:logo-github class="h-6 w-6" />
      </a>
    </div>
  </header>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { EthereumStore } from '~/stores/ethereum.store';
  import { mapState } from 'pinia';
  import Favicon from '~icons/logo/favicon.svg';
  export default defineComponent({
    name: 'AppHeader',
    components: {
      Favicon,
    },
    setup() {
      return {};
    },
    computed: {
      ...mapState(EthereumStore, ['accountConnected', 'account']),
    },
  });
</script>
<style lang="less" scoped>
  .header {
    height: 60px;
    background: rgba(255, 255, 255, 0.7) !important;
    backdrop-filter: blur(12px) !important;
    box-shadow: 0px 0px 25px 5px rgb(10 10 10 / 12%) !important;
    @apply text-base-13 dark:text-base-1;

    .bar-title {
      @apply font-bold text-base-13 dark:text-base-1;
    }
  }

  .dark {
    .header {
      background: rgba(40, 40, 40, 0.5) !important;
      box-shadow: 0px 0px 25px 5px rgb(0 0 0 / 12%) !important;
    }
  }
</style>
