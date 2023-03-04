<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { AppSetting } from '~/stores/app-setting.store';
  import { useEthereumStore } from '~/stores/ethereum.store';
  export default defineComponent({
    name: 'App',
    setup() {
      AppSetting();
      useEthereumStore();
    },
  });
</script>
<style lang="less">
  @import url('./style/index.less');
  @import url('./style/theme/dark.less');
</style>
