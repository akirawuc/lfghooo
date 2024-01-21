import { createConfig } from "wagmi";
import { getDefaultConfig } from "connectkit";
import { mainnet } from "wagmi/chains";


const chains = [mainnet];

export const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    alchemyId: process.env.ALCHEMY_ID, // or infuraId
    walletConnectProjectId: '7b7933728351c6962a4092d7a6e60f5f',
    chains,

    // Required
    appName: "Your App Name",

    // Optional
    appDescription: "Your App Description",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  }),
);
