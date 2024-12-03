"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col mt-50 items-center justify-between p-24">
      <div>
        <h1 className="mb-10">Hello Buddy!</h1>
        <ConnectButton />
        {/* <SendTransaction /> */}
      </div>

      <div>
        <h3>Profile:</h3>
      </div>
    </main>
  );
}
