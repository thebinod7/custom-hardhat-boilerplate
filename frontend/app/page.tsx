"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import { formatEther, Hex } from "viem";
import { baseSepolia } from "viem/chains";
import { useAccount } from "wagmi";
import { createReadContract, createWriteContract } from "./utils";

export default function Home() {
  const [value, setValue] = useState("");
  const { address, chain } = useAccount();

  const handleReadClick = async () => {
    const contract = createReadContract({ address: address as Hex });
    const d: any = await contract.read.getData();
    setValue(formatEther(d));
  };

  const handleWriteClick = async () => {
    if (chain?.id !== baseSepolia.id) {
      alert("Wrong Chain! Please switch to Base Sepolia Network");
      return;
    }
    const contract = createWriteContract({ address: address as Hex });

    await contract.write.saveData([2900000000000]);
    alert("Data written successfully!");
  };

  return (
    <main className="flex min-h-screen flex-col mt-50 items-center justify-between p-24">
      <div>
        <h1 className="mb-10">My DApp 2025!</h1>
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
      </div>

      <div>
        <h3>Current Value: {value}</h3>
      </div>
    </main>
  );
}
