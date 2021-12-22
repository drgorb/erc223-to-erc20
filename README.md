# erc223-to-erc20
a wrapper to easily convert ERC223 to ERC20 tokens

# Verified Deployments

* [mainnet](https://etherscan.io/address/0x5d9bbd3b6316f4044117eade443527b7490ab725)
* [kovan](https://kovan.etherscan.io/address/0x891810E3bC6dA021999CD7B83304338E3Db48289)

# Wrapping ERC223 in ERC20

The Sweetcoin suffers from the fact that it has been implemented as an ERC223 and that this standard has failed to take off in the Ethereum ecosystem.

Theerefore, Sweetcoin is unusable in most (if not all) DEFI tools. In order to remedy to this, a [wrapper has been written](https://github.com/drgorb/erc223-to-erc20).

The wrapper can only wrap one token. It has been deployed on Kovan for the community to test it and decide if it makes sense to deploy the same contract to ETH Mainnet.

## Testing the wrapper

The test system is composed of a [mintable ERC223](https://kovan.etherscan.io/address/0x891810E3bC6dA021999CD7B83304338E3Db48289#writeContract) token which can be wrapped in the deployed wrapper contract.

### Step 1 Mint yourself some tokens

As this is a test network, you can mint as many test tokens as you want into your address. Go to [Kovan Etherscan](https://kovan.etherscan.io/address/0x891810E3bC6dA021999CD7B83304338E3Db48289#writeContract) and connect the page to your wallet by clicking the `Connect to Web3` link

>**make sure you select the Kovan network in your wallet**

Make sure you connect an address with some KETH in it as you will need some to fund the transfers. You can go to the [Kovan Faucet](https://github.com/kovan-testnet/faucet) to request some KETH if you don't have any.

![](https://i.imgur.com/P4S4Flm.png)

It should now show your connected address like so
![](https://i.imgur.com/lxTL7JM.png)


Now scroll down to the `mint` function.

![](https://i.imgur.com/nJnNRek.png)

In the `recipient` field you can put any address. I would advise to use the same address you connected to Etherscan. In the `amount` field, enter an amount followed by 18 zeroes. If you would like to mint 10 token, the amount should be `10000000000000000000`. This is because the token has an 18 decimals precision. Here is an example:

![](https://i.imgur.com/RYrOk1U.png)

Once you click the `Write` button and confirm the transaction in your wallet, you will be the proud owner of some worthless test token.

### Step 2 add the tokens to Metamask

Open Metamask and scroll down to the `Add Token` button

![](https://i.imgur.com/F0WsjyT.png)

Click the `Add Token` button and choose `Custom Token` in the top bar

The Test token's address is `0x891810E3bC6dA021999CD7B83304338E3Db48289`

![](https://i.imgur.com/LUnY2rh.png)

Click `next` and finally `Add Token`

![](https://i.imgur.com/biKi75x.png)

#### Repeat for the wrapped token

You have to repeat the above steps for the wrapped token. The only difference is the address: `0x959bDcdb71F2842CdFE26782C00759e8d079DEDE`

### Step 3 send some tokens to the wrapper

In order to wrapp your ERC223 Test tokens in the ERC20 wrapper, all you need to do is send them to the contract. 

>Before you start, copy the Wrapper's address `0x959bDcdb71F2842CdFE26782C00759e8d079DEDE` to the clipboard in order to have it ready when you create the transaction.

Open Metamask again and click on the arrow on the right hand side of the token Symbol

![](https://i.imgur.com/7wuo9F9.png)

Click the `Send` button and fill in the fields. The amount you send will be added to your balance in the wrapped token.

![](https://i.imgur.com/FqDQxa3.png)

click `Next`

![](https://i.imgur.com/ck6aDFD.png)

and `Confirm`

>You should repeat this process at least one more time in order to make sure that your balance is indeed increased and not overwritten. 

### Step 4 unwrapping the tokens

Now that you have wrapped some tokens it is time to unwrap them and get your balance in the Test token back.

In order to unwrap the tokens, they have to be sent to the holder's address. In my case, I hold all the tokens in the `Account 1` account in Metamask. In order to unwrap the tokens I have to use `Account 1` and send the tokens to `Account 1`. Here are the screenshots

Scroll down to the Wrapped tokens and click on the arrow

![](https://i.imgur.com/CRcx0C3.png)

Select `Send`

![](https://i.imgur.com/aKbmQOv.png)

Click the `Transfer between my accounts` link

![](https://i.imgur.com/Ep6s1D3.png)

Chose the currently active account. In my case, that is `Account 1`
![](https://i.imgur.com/wBLYd9u.png)

Enter the amount you would like to unwrap and click `Next`
![](https://i.imgur.com/2ZC86PO.png)

The balance of your test tokens should have increased by the transferred amount
