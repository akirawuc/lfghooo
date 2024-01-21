import { useModal } from "connectkit";
import { useAccount, usePrepareContractWrite, useContractWrite } from "wagmi";




const Card = (props: any) => {

    const { isConnected } = useAccount();
    const { setOpen } = useModal();

    const { config } = usePrepareContractWrite({
        addressOrName: '0xfE5b74e9d65B800aAfaDE81B21580D05a53252Ec',

        
    })

    return (
        <div className="card">
            <div className="img-container">
            <img alt="nft" src={props.nft.imageSrc} />
            </div>
            <div className="card-details">
                
                    <h3>{props.nft.name}</h3>
                    <p>{props.nft.address}</p>
                    <h4>{props.nft.price} ETH</h4>

                
            </div>
            {
                 isConnected && (
                    <button>Mint with GHO</button>
                )
    
            }

            {
                !isConnected && (
                    <button onClick={() => setOpen(true)}>Connect Wallet to Mint</button>
                )
            }
           
        </div>

    )
}   
        
    
    


export default Card;