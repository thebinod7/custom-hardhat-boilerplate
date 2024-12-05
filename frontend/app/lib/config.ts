"use client";

import { cookieStorage, createConfig, createStorage, http } from "wagmi";
import { baseSepolia, bscTestnet, mainnet } from "wagmi/chains";
import { injected, metaMask, safe, walletConnect } from "wagmi/connectors";

// Create PROJECT_ID from https://cloud.reown.com/
const PROJECT_ID = process.env.NEXT_PUBLIC_RAINBOW_PROJECT_ID as string;

export const CONTRACT_ADDRESS = "0xE1a4e2FC2A7C9A474e323d03bD0172DbB58e4b2f";

export const SUPPORTED_CHAINS = [mainnet, bscTestnet, baseSepolia];

export const config = createConfig({
  connectors: [
    injected(),
    walletConnect({ projectId: PROJECT_ID }),
    metaMask(),
    safe(),
  ],
  chains: SUPPORTED_CHAINS as any,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: SUPPORTED_CHAINS.reduce(
    (obj, chain) => ({ ...obj, [chain.id]: http() }),
    {}
  ),
});

// ========= Transports reduce to =========
// transports: {
//   1: http(), // Ethereum
//   137: http(), // Polygon
//   56: http() // Binance Smart Chain
// }

// export const config = getDefaultConfig({
//   appName: "My RainbowKit App",
//   projectId: PROJECT_ID,
//   chains: [mainnet, sepolia, bscTestnet, base],
//   ssr: true,
// });
