<template>
  <app-header />
  <div class="views-layout relative z-10" :style="{}">
    <router-view v-slot="{ Component }">
      <component :is="Component" class="layout-content mx-auto px-4 pb-8 sm:px-7.5" />
    </router-view>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import appHeader from './app-header.vue';
  import appFooter from './app-footer.vue';
  export default defineComponent({
    name: 'Layout',
    components: {
      appHeader,
      appFooter,
    },
  });
</script>
<style lang="less" scoped>
  .views-layout {
    .layout-content {
      @apply pt-10 pb-16;
      // min-height: calc(100vh - 22px);
    }
  }
</style>
