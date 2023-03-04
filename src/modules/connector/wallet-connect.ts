import { ethers } from 'ethers';

import UniversalProvider, { NamespaceConfig } from '@walletconnect/universal-provider';
// import QRCodeModal from '@walletconnect/qrcode-modal';
import { Web3Modal } from '@web3modal/standalone';

export class WalletConnectConnector {
  provider!: UniversalProvider;
  private web3modal: Web3Modal;
  constructor() {
    this.web3modal = new Web3Modal({
      projectId: PROJECT_ID,
      // 2023.6.3
      walletConnectVersion: new Date().getTime() > 1687881600000 ? 2 : 1,
      themeMode: 'dark',
    });
  }

  async initClient() {
    // if (reset) {
    //   this.provider = undefined;
    // }
    if (!this.provider) {
      const provider = await UniversalProvider.init(singClientOption).then((e) => {
        this.provider = e;
        return e;
      });
      return provider;
    } else {
      return this.provider;
    }
  }
  async connect(namespaces: NamespaceConfig = defailtNamespaces) {
    const provider = await this.initClient();
    const web3modal = this.web3modal;
    web3modal.setTheme({ themeMode: 'dark' });
    provider.once(WalletConnectEvents.DISPLAY_URI, (uri: string) => {
      console.log('uri', uri);
      web3modal.openModal({ uri });
    });

    const isConnected = await Promise.race([
      provider.connect({ namespaces }).then((e) => true),
      new Promise((resolve) =>
        web3modal.subscribeModal((n) => {
          if (!n.open) {
            console.log(n);
            resolve(n);
          }
        }),
      ).then((e) => false),
    ]);
    if (!isConnected) {
      throw Error('Modal Closed, Please try again');
    } else {
      const accounts: string[] = await provider.enable();
      if (!accounts[0]) {
        throw Error('no account connected');
      }
      web3modal.closeModal();
      return {
        accounts,
        provider: new ethers.providers.Web3Provider(provider),
      };
    }
  }

  async isConnected() {
    if (!this.provider) {
      await this.initClient();
    }

    try {
      const accounts: string[] = await this.provider!.enable();
      return accounts;
    } catch (error) {
      return [];
    }
  }
}

const PROJECT_ID = 'be4d3699212a394eb99b2570bc4a1ac6';

export enum WalletConnectEvents {
  CONNECT = 'connect',
  DISPLAY_URI = 'display_uri',
  DISCONNECT = 'disconnect',

  CHAIN_CHANGE = 'chainChanged',
  ACCOUNT_CHANGE = 'accountsChanged',
}
const defailtNamespaces = {
  eip155: {
    methods: [
      'eth_accounts',
      'eth_sendTransaction',
      'eth_signTransaction',
      'eth_sign',
      'eth_signTypedData_v4',
    ],
    chains: ['eip155:1'],
    events: ['chainChanged', 'accountsChanged'],
    rpcMap: {
      1: 'https://rpc.ankr.com/eth',
    },
  },
};

const singClientOption = {
  logger: 'warn',
  relayUrl: 'wss://relay.walletconnect.com',
  projectId: PROJECT_ID,
  metadata: {
    name: 'Moseu',
    description: 'a web3modal demo for vue',
    url: window.location.host,
    icons: [`${window.location.origin}/favicon.svg`],
  },
};
