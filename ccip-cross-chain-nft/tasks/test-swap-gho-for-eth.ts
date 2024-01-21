import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";
import { Wallet, ethers } from "ethers";
import { SwapSourceMinter, SwapSourceMinter__factory, IERC20Permit, IERC20Permit__factory } from "../typechain-types";
import { Spinner } from "../utils/spinner";

task("execute-swap", "Executes the swapGHOForETH function in the SwapSourceMinter contract")
    .addParam("swapSourceMinter", "The address of the SwapSourceMinter contract")
    .addParam("ghoAmount", "The amount of GHO to swap (in ethers)")
    .setAction(async (taskArguments: TaskArguments, hre) => {
        const { swapSourceMinter, ghoAmount } = taskArguments;

        const privateKey = hre.config.networks[hre.network.name].accounts[0];
        const rpcProviderUrl = hre.config.networks[hre.network.name].url;
        console.log(`chain id: ${hre.config.networks[hre.network.name].chainId}`);

        const provider = new hre.ethers.JsonRpcProvider(rpcProviderUrl);
        const wallet = new Wallet(privateKey, provider);


        const spinner: Spinner = new Spinner();

        console.log(`ℹ️  Executing swapGHOForETH function of the SwapSourceMinter contract at ${swapSourceMinter}`);
        spinner.start();

        const ghoToken = '0xc4bF5CbDaBE595361438F8c6a187bDc330539c60';
        // const ghoContract = await hre.ethers.getContractAt('IERC20', ghoToken) as IERC20;
        const ghoContract: IERC20Permit = IERC20Permit__factory.connect(ghoToken, wallet);
        const swapSourceMinterContract: SwapSourceMinter = SwapSourceMinter__factory.connect(swapSourceMinter, wallet);

        const parsedGhoAmount = ethers.parseUnits(ghoAmount, 18);

        const nonce = await ghoContract.nonces(wallet.address);
        const deadline = 17058302600006 + 1705830266;
        const value = ethers.parseUnits(ghoAmount, 18);
        console.log(hre.config.networks[hre.network.name].chainId);
        const domain = {
            name: "Gho Token",
            version: '1',
            chainId: 11155111,
            verifyingContract: ghoToken
        };
        const types = {
            Permit: [
                { name: 'owner', type: 'address' },
                { name: 'spender', type: 'address' },
                { name: 'value', type: 'uint256' },
                { name: 'nonce', type: 'uint256' },
                { name: 'deadline', type: 'uint256' }
            ]
        };
        const uniswapRouterAddress = "0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD";
        const permitData = {
            owner: wallet.address,
            spender: uniswapRouterAddress,
            value,
            nonce,
            deadline
        };
        const signature = await wallet.signTypedData(domain, types, permitData);
        console.log(`signature: ${signature}`);
        const { v, r, s } = ethers.Signature.from(signature);
        console.log(`v: ${v}`);
        console.log(`r: ${r}`);
        console.log(`s: ${s}`);

        // Approve the SwapSourceMinter contract to spend GHO tokens
        // await ghoContract.permit(wallet.address, uniswapRouterAddress, value, deadline, v, r, s);
        const feeData = await provider.getFeeData();
        const overrides = {
            maxFeePerGas: feeData.maxFeePerGas,
            maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
            nonce: await wallet.getNonce()
        };
        // Execute the swap
        const tx = await swapSourceMinterContract.testPermit(parsedGhoAmount, deadline, v, r, s,overrides);
        // const tx = await swapSourceMinterContract.testPermitSwapGHOForETH(parsedGhoAmount,parsedGhoAmount, deadline, v, r, s,overrides);
        console.log(`tx: ${JSON.stringify(tx)}`);
        const receipt = await tx.wait();

        spinner.stop();
        console.log(`✅ Swap executed successfully, transaction hash: ${receipt?.hash}`);
    });

export default {};
