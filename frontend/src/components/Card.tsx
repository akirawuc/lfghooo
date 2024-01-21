const Card = (props: any) => {
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

            <button>Purchase with GHO</button>
            
            

        </div>

    )
}   
        
    
    


export default Card;