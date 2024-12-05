import { useReadContract } from "wagmi";
import { CONTRACT_ADDRESS } from "../lib/config";
import { CONTRACT_ABI } from "../constants";

function ReadContract() {
  const { data }: any = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "getData",
    args: [],
  });

  return <div>Stored Value: {data || "0"}</div>;
}

export default ReadContract;
