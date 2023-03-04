import { defineConfig, UserConfigExport, UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';
import Icons from 'unplugin-icons/vite';
import Components from 'unplugin-vue-components/vite';
import IconsResolver from 'unplugin-icons/resolver';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';

const userConfig: UserConfig = {
  css: {
    postcss: {
      plugins: [require('postcss-import'), require('tailwindcss'), require('autoprefixer')],
    },
  },
  resolve: {
    alias: {
      '~views/': `${path.resolve(__dirname, './src/views')}/`,
      '~/': `${path.resolve(__dirname, './src')}/`,
    },
  },
  define: {},
  server: {
    host: '0.0.0.0',
    port: 5173,
    watch: {
      ignored: ['./config/*', './locales/*'],
    },
  },
  esbuild: {
    pure: ['console.log'],
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    manifest: true,
    chunkSizeWarningLimit: 533,
    rollupOptions: {
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
      ],

      output: {
        manualChunks: {
          e: ['ethers'],
          v: ['vue', 'vue-router'],
        },
      },
    },
  },

  plugins: [
    vue(),
    // VueI18n({
    //   runtimeOnly: true,
    //   compositionOnly: true,
    //   include: [path.resolve(__dirname, 'locales/**')],
    // }),
    Icons({
      scale: 1.2,
      autoInstall: true,
      compiler: 'vue3',
      customCollections: {
        logo: FileSystemIconLoader('./src/assets/logo', (svg) =>
          svg.replace(/^<svg /, '<svg fill="currentColor" '),
        ),
        coin: FileSystemIconLoader('./src/assets/coins', (svg) =>
          svg.replace(/^<svg /, '<svg fill="currentColor" '),
        ),
      },
      iconCustomizer(collection, icon, props) {
        // customize this icon in this collection
        if (['logo', 'coin'].includes(collection)) {
          props.class = 'icon inline ';
        }
      },
    }),
    Components({
      resolvers: [
        IconsResolver({
          prefix: 'icon',
        }),
      ],
      dts: 'src/components.d.ts',
      dirs: ['src/views/components/'],
    }),
  ],
};

export default defineConfig(({ command }) => {
  if (command === 'serve') {
    userConfig.define = {
      process: process,
    };
    userConfig.resolve = {
      ...userConfig.resolve,
      alias: {
        ...userConfig.resolve?.alias,
        util: 'rollup-plugin-node-polyfills/polyfills/util',
        tty: 'rollup-plugin-node-polyfills/polyfills/tty',
      },
    };
  }
  return userConfig;
});
