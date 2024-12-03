"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import {
  createPublicClient,
  createWalletClient,
  custom,
  formatEther,
  getContract,
  Hex,
  http,
  publicActions,
} from "viem";
import { baseSepolia } from "viem/chains";
import { useAccount } from "wagmi";
import { abi } from "./contracts/SimpleStorage.json";

const CONTRACT_ADDRESS = "0xE1a4e2FC2A7C9A474e323d03bD0172DbB58e4b2f";

export default function Home() {
  const [value, setValue] = useState("");
  const { address, chain } = useAccount();

  const handleReadClick = async () => {
    const client = createWalletClient({
      account: address,
      chain: baseSepolia,
      transport: http(process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL),
    }).extend(publicActions);

    const contract = getContract({
      address: CONTRACT_ADDRESS as Hex,
      client,
      abi: abi,
    });

    const d: any = await contract.read.getData();
    setValue(formatEther(d));
  };

  const handleWriteClick = async () => {
    if (chain?.id !== baseSepolia.id) {
      alert("Wrong Chain! Please switch to Sepolia Network");
      return;
    }

    const publicClient = createPublicClient({
      chain: baseSepolia,
      transport: http(),
    });
    const client = createWalletClient({
      account: address,
      chain: baseSepolia,
      transport: custom(window.ethereum!), // For metamask only
    });

    const contract = getContract({
      address: CONTRACT_ADDRESS as Hex,
      client: {
        wallet: client,
        public: publicClient,
      },
      abi: abi,
    });

    await contract.write.saveData([50505]);
    alert("Data written successfully!");
  };

  return (
    <main className="flex min-h-screen flex-col mt-50 items-center justify-between p-24">
      <div>
        <h1 className="mb-10">Hello Buddy!</h1>
        <ConnectButton />

        <div className="m-10">
          <button
            onClick={handleWriteClick}
            className="btn rounded p-5 border-1"
          >
            Write Data
          </button>

          <button
            onClick={handleReadClick}
            className="btn rounded p-5 border-1"
          >
            Read Data
          </button>
        </div>
        {/* <SendTransaction /> */}
      </div>

      <div>
        <h3>Current Value: {value}</h3>
      </div>
    </main>
  );
}
