# Advanced Defi Script

## Overview of Script

This script performs a series of operations involving multiple DeFi protocols to showcase advanced interactions within the decentralized finance ecosystem. The script operates on the Ethereum Sepolia testnet and performs the following actions:

##### 1. Swap ETH for DAI on Uniswap:
 The script first swaps a specified amount of ETH for DAI using the Uniswap decentralized exchange. Uniswap's router contract is utilized to facilitate the token swap.

##### 2.Deposit DAI into Aave Lending Pool: 
Once the DAI is acquired, it is then deposited into Aave's lending pool. This allows the user to    earn interest on the deposited DAI through Aave's lending protocol.

The purpose of this script is to demonstrate how different DeFi protocols can be integrated to enhance functionality and leverage the benefits of yield farming.


## Diagram Illustration

<!-- file:///C:/Users/karak/OneDrive/Pictures/Screenshots/bounty.webp -->

#### Diagram Description:

- Start: The script initiates and sets up connections to Ethereum Sepolia testnet and DeFi protocols.

-Swap ETH for DAI: Utilizes Uniswap's router to swap ETH for DAI.

-Approve DAI for Aave: Approves Aave to handle the DAI tokens.

Deposit DAI into Aave: Deposits the approved DAI tokens into Aave’s lending pool.

End: The script completes the operations and logs the results.


## code Explanation

### Dependencies 
- ethers:  A library for interacting with the Ethereum blockchain.
- @uniswap/sdk: Provides utilities for interacting with Uniswap's protocol.
-@aave/protocol-v2: Used to interact with Aave's lending protocol.

### Initialization


```javascript
const provider = new ethers.providers.JsonRpcProvider('https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID');
const signer = provider.getSigner();
```
-Provider: Connects to the sepolia testnet.
-Signer: Represents the user's wallet to sign transactions.

### Uniswap Router Interaction


```javascript
const uniswapRouter = new ethers.Contract(UNISWAP_ROUTER_ADDRESS, UNISWAP_ROUTER_ABI, signer);
await uniswapRouter.swapExactETHForTokens(
daiAmountMin,
path,
signer.getAddress(),
Math.floor(Date.now()/1000) + 60*10,
{value: ethAmount}
);
```
-Router Contract: Facilitates the ETH to DAI swap.
-swapExactETHForTokens: Executes the swap transaction.

### Aave Interaction

```javascript
const daiToken = new ethers.Contract(DAI_ADDRESS, ERC20_ABI, signer);
await daiToken.approve(AAVE_LENDING_POOL_ADDRESS, daiAmountToDeposit);
await aaveLendingPool.deposit(DAI_ADDRESS, daiAmountToDeposit, signer.getAddress(), 0);
```

- DAI Token Contract: Approves Aave to manage the DAI tokens.

- Aave Deposit: Deposits the DAI into Aave’s lending pool.


### Summary

This script integrates Uniswap and Aave to demonstrate how to swap tokens and then earn yield on those tokens. Each step is performed by interacting with smart contracts deployed on the Sepolia testnet, ensuring the functionalities are tested in a real environment.


## How to Use

1. Clone the Repository:
```bash
git clone https://github.com/Yash-Karakoti/Script
```
2. Install Dependencies:
```bash
cd Script
npm install
```
3. Run the Script:
```bash
node script.js
```
4. Verify Transactions: Check the Sepolia testnet explorer for transaction details.
