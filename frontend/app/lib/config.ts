"use client";

import { http, createStorage, cookieStorage } from "wagmi";
import { mainnet, sepolia, bscTestnet, base } from "wagmi/chains";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";

const PROJECT_ID = process.env.NEXT_PUBLIC_RAINBOW_PROJECT_ID as string;
const SUPPORTED_CHAINS = [mainnet, sepolia, bscTestnet, base];

export const config = getDefaultConfig({
  appName: "WalletConnection",
  projectId: PROJECT_ID,
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
