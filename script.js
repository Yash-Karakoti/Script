const { ethers } = require("ethers");
const { ChainId, Token, TokenAmount, Pair, Route, Trade, TradeType, SwapParameters } = require('@uniswap/sdk');
const { AaveLendingPool, AaveProtocolDataProvider } = require('@aave/protocol-v2');

// Define provider and signer
const provider = new ethers.providers.JsonRpcProvider('https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID');
const signer = provider.getSigner();

// Define contract addresses (replace with actual Sepolia testnet addresses)
const UNISWAP_ROUTER_ADDRESS = '0xUniswapRouterAddress'; // Uniswap Router Address
const AAVE_LENDING_POOL_ADDRESS = '0xAaveLendingPoolAddress'; // Aave Lending Pool Address
const DAI_ADDRESS = '0xDAIAddress'; // DAI Token Address

// Define ABIs (simplified for illustration)
const UNISWAP_ROUTER_ABI = [ /* ... Uniswap Router ABI ... */ ];
const AAVE_LENDING_POOL_ABI = [ /* ... Aave Lending Pool ABI ... */ ];
const ERC20_ABI = [ /* ... ERC20 ABI ... */ ];

const uniswapRouter = new ethers.Contract(UNISWAP_ROUTER_ADDRESS, UNISWAP_ROUTER_ABI, signer);
const aaveLendingPool = new ethers.Contract(AAVE_LENDING_POOL_ADDRESS, AAVE_LENDING_POOL_ABI, signer);
const daiToken = new ethers.Contract(DAI_ADDRESS, ERC20_ABI, signer);

async function swapEthForDaiAndDeposit() {
    // Step 1: Swap ETH for DAI on Uniswap
    const ethAmount = ethers.utils.parseEther("1.0"); // Swap 1 ETH
    const daiAmountMin = ethers.utils.parseUnits("1000", 18); // Minimum DAI to receive

    // Uniswap swap path
    const path = [ethers.constants.AddressZero, DAI_ADDRESS]; // ETH to DAI

    await uniswapRouter.swapExactETHForTokens(
        daiAmountMin,
        path,
        signer.getAddress(),
        Math.floor(Date.now() / 1000) + 60 * 10, // Deadline 10 minutes from now
        { value: ethAmount }
    );

    console.log('ETH swapped for DAI');

    // Step 2: Approve Aave to spend DAI
    const daiAmountToDeposit = await daiToken.balanceOf(signer.getAddress());
    await daiToken.approve(AAVE_LENDING_POOL_ADDRESS, daiAmountToDeposit);

    console.log('DAI approved for Aave');

    // Step 3: Deposit DAI into Aave Lending Pool
    await aaveLendingPool.deposit(DAI_ADDRESS, daiAmountToDeposit, signer.getAddress(), 0);

    console.log('DAI deposited into Aave Lending Pool');
}

swapEthForDaiAndDeposit().catch(console.error);
