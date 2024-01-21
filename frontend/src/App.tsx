
import './style.css';
import Header from './components/Header';
import Marketplace from './components/Marketaplace';
import { config } from './config'
import { WagmiConfig, erc721ABI, useContractRead } from "wagmi";
import { ConnectKitProvider } from "connectkit";
import { useEffect } from 'react';


const App = () => {


  const nft1  = {
    imageSrc: 
      "https://images.unsplash.com/photo-1569852178898-9605dfd85b4a?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "To the Moon",
    address: '0xfE5b74e9d65B800aAfaDE81B21580D05a53252Ec',
    price: 0.2,
  };

  const nft2  = {
    imageSrc: 
      "https://images.unsplash.com/photo-1617538716228-213f468a2c6c?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Abstract",
    address: '0xfE5b74e9d65B800aAfaDE81B21580D05a53252Ec',
    price: 0.22,
  };

  const nft3  = {
    imageSrc: 
      "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Futurism",
    address: '0xfE5b74e9d65B800aAfaDE81B21580D05a53252Ec',
    price: 0.02,
  };

  const nfts = [nft1, nft2, nft3, nft1, nft2, nft3, nft1, nft2, nft3, nft1];
  
  return (
    <WagmiConfig config={config}> 
      <ConnectKitProvider theme="nouns" >
    <div>
      <head>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap');
      </style>
      </head>

      <body>
        <Header />
        <Marketplace data={nfts} />
      </body>
      
      
    </div>
    </ConnectKitProvider>
    </WagmiConfig> 
  );
}

export default App;
