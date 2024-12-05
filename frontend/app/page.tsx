"use client";

import { useAccount } from "wagmi";
import { WalletOptions } from "./components/WalletOptions";
import { Account } from "./components/ConnectedAccount";
import ReadContract from "./components/ReadContract";
import WriteContract from "./components/WriteContract";

function ConnectWallet() {
  const { isConnected } = useAccount();
  if (isConnected) return <Account />;
  return <WalletOptions />;
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col mt-50 items-center justify-between p-24">
      <ConnectWallet />
      <WriteContract />
      <ReadContract />
    </main>
  );
}
