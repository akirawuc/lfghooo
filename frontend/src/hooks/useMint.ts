import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { WagmiConfig, erc721ABI, useContractRead } from "wagmi";

const abi = [
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address"
            }
        ],
        name: "mint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }];
const useMint = (account: `0x${string}`) => {
  const { config } = usePrepareContractWrite({
    address: "0x7F95Eda7a5CDD7CE4083FA821946Ad03eB840AB0",
    abi: abi,
    functionName: "mint",
    args: [account],
  });

  const { write, data } = useContractWrite(config);
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return { write, isLoading, isSuccess, data };
};

export default useMint;
