import ccipMintABI from "../abi/swapSourceMinter";

const useSwapSourceMint = ({
  destinationChainSelector,
  nftAddress,
  receiver,
  payFeesIn,
  ghoAmount,
  deadline,
  v,
  r,
  s,
}) => {
  const { config } = usePrepareContractWrite({
    address: '0xYourContractAddress', // Replace with your contract address
    abi: abi,
    functionName: 'mint',
    args: [
      destinationChainSelector,
      nftAddress,
      receiver,
      payFeesIn,
      ghoAmount,
      deadline,
      v,
      r,
      s,
    ],
  });

  const { write, data } = useContractWrite(config);
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return { write, isLoading, isSuccess, data };
};

export default useSwapSourceMint;
