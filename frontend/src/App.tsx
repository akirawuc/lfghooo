
import './style.css';
import Header from './components/Header';
import Marketplace from './components/Marketaplace';


const App = () => {

  const nft1  = {
    imageSrc: 
      "https://images.unsplash.com/photo-1569852178898-9605dfd85b4a?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "To the Moon",
    price: 0.2,
  };

  const nft2  = {
    imageSrc: 
      "https://images.unsplash.com/photo-1484589065579-248aad0d8b13?q=80&w=3318&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Abstract",
    price: 0.22,
  };

  const nft3  = {
    imageSrc: 
      "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Futurism",
    price: 0.02,
  };

  const nfts = [nft1, nft2, nft3, nft1, nft2, nft3, nft1, nft2, nft3, nft1];

  return (
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
  );
}

export default App;
