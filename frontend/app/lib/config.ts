"use client";

import { http, createStorage, cookieStorage } from "wagmi";
import { mainnet, sepolia, bscTestnet, base } from "wagmi/chains";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";

const PROJECT_ID = process.env.NEXT_PUBLIC_RAINBOW_PROJECT_ID as string;

const supportedChains = [mainnet, sepolia, bscTestnet, base];

export const config = getDefaultConfig({
  appName: "WalletConnection",
  projectId: PROJECT_ID,
  chains: supportedChains as any,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: supportedChains.reduce(
    (obj, chain) => ({ ...obj, [chain.id]: http() }),
    {}
  ),
});

// export const config = getDefaultConfig({
//   appName: "My RainbowKit App",
//   projectId: PROJECT_ID,
//   chains: [mainnet, sepolia, bscTestnet, base],
//   ssr: true,
// });
