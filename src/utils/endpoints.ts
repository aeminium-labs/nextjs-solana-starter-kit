import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl } from "@solana/web3.js";

const SOLANA_MAIN = clusterApiUrl(WalletAdapterNetwork.Mainnet);
const SOLANA_TEST = clusterApiUrl(WalletAdapterNetwork.Testnet);
const SOLANA_DEV = clusterApiUrl(WalletAdapterNetwork.Devnet);
const GENESYSGO = "https://pentacle.genesysgo.net";
const METAPLEX = "https://api.metaplex.solana.com";
const SERUM = "https://solana-api.projectserum.com";

// You can use any of the other enpoints here
export const NETWORK = SOLANA_MAIN;
