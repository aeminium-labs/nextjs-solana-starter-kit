# Build your own Solana dApp with NextJS and TypeScript

[Preview](https://user-images.githubusercontent.com/38172/211966201-abb860ec-fcd3-40a0-b012-b6fc72109650.webm)

This starter kit contains everything you need to get started with Solana dApps! 🚀

## What's included

### **🗝️ Connect to a Solana wallet and validate ownership**

The basics first!

Get any Solana wallet supported by [@solana/wallet-adapter](https://github.com/solana-labs/wallet-adapter) into your dApp by simply changing the configuration. Phantom and Backpack are already included by default.

To improve the UX and save a couple of clicks we've enabled auto-connect by default which means that the dApp will connect to your wallet automatically if it's already been approved before.

Since that behaviour could turn into a security issue, we've also setup a signing mechanism to validate wallet ownership. We've made it so it automatically asks for a signature when the wallet connects but this can also be done on specific actions to validate the intent.

Creating a signature is done on client-side and doesn't have any interaction with the chain so it's totally safe.

### **🔗 Interact with Solana's blockchain**

Once the wallet is connected it's time to interact with the blockchain!

In this starter kit you'll find specific examples for these actions:

- create a transaction of SOL to other wallet
- create transaction of a SPL token (like $BONK) to other wallet
- submit the transaction to the blockchain
- confirm if the transaction was successful
- find Twitter handle associated with wallet address

All of these actions are done natively using Solana Labs official libraries like [@solana/web3.js](https://solana-labs.github.io/solana-web3.js/), [@solana/spl-token](https://solana-labs.github.io/solana-program-library/token/js/) and [@solana/name-service](https://spl.solana.com/name-service).

On top of that, we're using NextJS architecture to have these actions executed in the backend and only the transaction signing happens on client-side.

### **🔌 Fetch on-chain data through Helius API**

Solana's blockchain data can be very hard to parse but luckily for all of us there are services like [Helius](https://helius.xyz/) which provide APIs to access some of the stored data.

Not just that but they also parse and format the data in a much more readable way, which is the dream of any developer!

In this template we're using Helius API to retrieve the list of NFTs in your wallet, but you can use that example to get other data from their multiple endpoints. Neat!

### **🎨 Build your own style**

This templates uses [Tailwind CSS](https://tailwindcss.com/) and [daisyUI](https://daisyui.com/) for rapid development. This allows you to quickly iterate and build any kind of dApp with pre-defined or custom themes.

You can quickly change theme changing `daisy.themes` within `./tailwind.config.js` and defining the `data-theme` attribute in `<html>` tag.

To make everything more accessible we even integrated a simple theme switcher to give the option of toggling between dark and light mode.

## Getting Started

1. Get an API key from [Helius](https://helius.xyz/). We'll need this to be able to fetch wallet details.
2. Run `npx create-next-app -e https://github.com/aeminium-labs/nextjs-solana-starter-kit` to get this template into your local environment (can also click on the "Use this template" button or just fork this repository)
3. Add a `.env.local` file with your Helius API key

```
HELIUS_API_KEY=<your key>
```

4. Run `npm run dev` to start dev server
5. Make changes and have fun!

## Deploying

1. Run `npm run build` locally to make sure everything is compiling correctly
2. Link your favourite server provider to your repository (using Vercel for the demo)
3. Any push to `main` branch should automatically deploy a new version

> _This starter kit was only possible because of the amazing [Create dApp Solana Next](https://github.com/thuglabs/create-dapp-solana-nextjs) template, which served as a base for everything else in here._
