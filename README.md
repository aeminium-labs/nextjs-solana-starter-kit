# Build your own Solana dApp with NextJS and TypeScript

![Screenshot from 2021-11-10 02-03-57](https://user-images.githubusercontent.com/38172/141036336-194a983d-fc05-4b2d-acd3-3dff221f5328.png)

This kit contains everything you need to get started with Solana dApps.

Connect to a wallet, verify its ownership, list stored NFTs and even fetch associated Twitter handle if [registered](https://naming.bonfida.org/#/twitter-registration)!

🚨 **Live demo: https://nextjs-solana-starter-kit.vercel.app/** 🚨

What's included:
- [@solana/wallet-adapter](https://github.com/solana-labs/wallet-adapter) and [@solana/web3.js](https://solana-labs.github.io/solana-web3.js) for interactions with wallets & blockchain.
- [@metaplex/js](https://github.com/metaplex/js) for interactions with metadata
- [@solana/spl-name-service](https://github.com/solana-labs/solana-program-library/tree/master/name-service) for resolving addresses to domain/twitter
- Tailwind CSS (with [daisyUI](https://daisyui.com/))

This starter kit was only possible because of the amazing https://github.com/thuglabs/create-dapp-solana-nextjs template, which served as a base for everything else in here.

## Getting Started

1. Run `yarn create next-app -e https://github.com/braposo/nextjs-solana-starter-kit` (can also click on the "Use this template" button or just fork this repository)
2. Run `yarn dev` to start dev server
3. Make changes and have fun!

## Style

[Tailwind CSS](https://tailwindcss.com/) or [daisyUI](https://daisyui.com/) are selected tools for rapid style development.

You can quickly change theme changing `daisy.themes` within `./tailwind.config.js`.
More info here: https://daisyui.com/docs/default-themes


## Deploying

1. Run `yarn build` locally to make sure everything is compiling correctly
2. Link your favourite server provider to your repository (using Vercel for the demo)
3. Any push to `main` branch should automatically deploy a new version
