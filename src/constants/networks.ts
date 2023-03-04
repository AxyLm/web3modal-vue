import { ChainIds } from '~/constants/enums/chain-id';

/**
 * EIP-3085
 * @refer https://eips.ethereum.org/EIPS/eip-3085
 */
export interface EvmChainParameter {
  chainId: string; // A 0x-prefixed hexadecimal string
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string; // 2-6 characters long
    decimals: 18;
  };
  rpcUrls: string[];
  blockExplorerUrls: string[];
  iconUrls?: string[]; // Currently ignored.
}

export const networks: Record<ChainIds, EvmChainParameter> = {
  [ChainIds.ETHEREUM]: {
    chainId: '0x1',
    chainName: 'Ethereum',
    blockExplorerUrls: ['https://etherscan.io'],
    rpcUrls: ['https://eth.llamarpc.com'],
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
  },
  [ChainIds.BSC]: {
    chainId: '0x38',
    chainName: 'BNB Chain',
    blockExplorerUrls: ['https://bscscan.com'],
    rpcUrls: ['https://bsc-dataseed4.ninicoin.io'],
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
    iconUrls: [],
  },
  [ChainIds.AVAX]: {
    chainId: '0xa86a', // 43114
    chainName: 'Avalanche',
    blockExplorerUrls: ['https://snowtrace.io'],
    rpcUrls: ['https://api.avax.network/ext/bc/C/rpc', 'https://rpc.ankr.com/avalanche'],
    nativeCurrency: {
      name: 'AVAX',
      symbol: 'Avalanche',
      decimals: 18,
    },
  },

  // TODO: more network..
};

export function getEvmChainParameter(chainId: ChainIds): EvmChainParameter;
export function getEvmChainParameter(chainId: number | string): EvmChainParameter | undefined;
export function getEvmChainParameter(chainId: ChainIds | string) {
  if (typeof chainId != 'string') {
    return networks[chainId];
  } else {
    const _chain = `0x${Number(chainId).toString(16)}`;
    return Object.values(networks).find((e) => e.chainId === _chain);
  }
}
