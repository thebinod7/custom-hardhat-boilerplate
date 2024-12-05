import * as React from "react";
import {
  type BaseError,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { CONTRACT_ADDRESS } from "../lib/config";
import { CONTRACT_ABI } from "../constants";

export function WriteContract() {
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const randomData = formData.get("randomData") as string;
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "saveData",
      args: [BigInt(randomData)],
    });
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return (
    <form onSubmit={submit}>
      <input name="randomData" placeholder="69420" required />
      <button disabled={isPending} type="submit">
        {isPending ? "Confirming..." : "Save Data"}
      </button>
      {hash && <div>Transaction Hash: {hash}</div>}
      {isConfirming && <div>Waiting for confirmation...</div>}
      {isConfirmed && <div>Transaction confirmed.</div>}
      {error && (
        <div>Error: {(error as BaseError).shortMessage || error.message}</div>
      )}
    </form>
  );
}

export default WriteContract;
