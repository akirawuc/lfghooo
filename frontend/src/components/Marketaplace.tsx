import Card from './Card'


const Marketplace = (props: any) => {
    return (
        <div className='marketplace'>
            <div className='marketplace-header'>
                <input placeholder='search...'></input>
                <button>Reward</button>
                
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