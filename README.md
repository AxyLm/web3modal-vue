# web3modal-vue 

A dapp demo use walletconnect for vue

![](https://img.shields.io/website?url=http%3A%2F%2Fweb3modal-vue.netlify.app)
![](https://img.shields.io/netlify/9c328b06-9ebd-4f15-8a4f-66c37399e9bc)
  
[web3modal-vue.netlify.app](https://web3modal-vue.netlify.app/)

## Start

### development

Just run and visit [http://localhost:5173/](http://localhost:5173/)

```bash
pnpm dev
```

### build

```bash
pnpm build
```


```
// !!! vite.config.ts

import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
...
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

```

## LICENSE

[MIT license](./LICENSE)
