const withPlugins = require("next-compose-plugins");

/** @type {import('next').NextConfig} */
/** eslint-disable @typescript-eslint/no-var-requires */
const withTM = require("next-transpile-modules")([
  "@solana/wallet-adapter-base",
  "@solana/wallet-adapter-ledger",
  "@solana/wallet-adapter-phantom",
  "@solana/wallet-adapter-react",
  "@solana/wallet-adapter-solflare",
  "@solana/wallet-adapter-sollet",
  "@solana/wallet-adapter-wallets",
  // Uncomment wallets you want to use
  // "@solana/wallet-adapter-bitpie",
  // "@solana/wallet-adapter-coin98",
  // "@solana/wallet-adapter-mathwallet",
  // "@solana/wallet-adapter-solong",
  // "@solana/wallet-adapter-torus",
  // "@project-serum/sol-wallet-adapter",
  // "@solana/wallet-adapter-ant-design",
]);

const plugins = [
  [
    withTM,
    {
      webpack5: true,
      reactStrictMode: true,
    },
  ],
];

const nextConfig = {
  distDir: "build",
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
  images: {
    domains: [
      "arweave.net",
      "www.arweave.net",
      "trashypandas.mypinata.cloud",
      "assets.tiexo.com",
      "www.panzerdogs.io",
      "sol-parasites.s3.us-west-2.amazonaws.com",
      "ipfs.io",
      "testlaunchmynft.mypinata.cloud",
    ],
  },
};

module.exports = withPlugins(plugins, nextConfig);
