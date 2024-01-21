import Card from './Card'
import { ConnectKitButton } from 'connectkit';
import { useAccount } from 'wagmi'



const Marketplace = (props: any) => {

    const { isConnected } = useAccount();

    return (
        <div className='marketplace'>
            <div className='mktp-header'>

                {
                isConnected && (
                    <div className='welcome'>

                    <h1>Welcome back!</h1>
                    <h3>You've earned 16.9 GHO token.</h3>
                    </div>
                    )

                }
                {
                !isConnected && (
                    <div className='welcome'>
                    <h1>Welcome to LFGHOSHOP</h1>
                    <h3>Connect wallet to mint NFTs with GHO token!</h3>
                    <div className='spacer'></div>
                    <ConnectKitButton />
                    </div>
                    
                  )
                }

            

        


                
            </div>
            <div className='card-container'>


            {props.data.map((nft: any) =>
      <Card nft={nft} />)
     }
            
            <div className='empty'><Card nft={props.data[1]}/></div>
            <div className='empty'><Card nft={props.data[1]}/></div>
            <div className='empty'><Card nft={props.data[1]}/></div>
            <div className='empty'><Card nft={props.data[1]}/></div>

                </div>
        </div>
        
        
    )
}   
        
    
    


export default Marketplace;