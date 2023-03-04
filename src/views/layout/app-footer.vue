<template>
  <footer
    class="absolute bottom-0 flex h-16 w-full items-center justify-center bg-base-200 px-4 sm:px-7.5 xl:px-10"
  >
    <div class="flex items-center gap-2 text-xs">
      <span class="text-white/70">
        Powered by
        <a
          href="http://moseu.com"
          target="_blank"
          rel="noopener noreferrer"
          class="font-bold text-primary"
        >
          Moseu
        </a>
      </span>
    </div>
  </footer>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    components: {},
    setup() {
      return {};
    },
  });
</script>

<style scoped lang="less">
  footer {
    border-top: 1px solid #282b4c;
  }
</style>
