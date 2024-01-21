import { useAccount} from "wagmi";
import { useModal } from "connectkit";

const Header = () => {

    const { isConnected } = useAccount();
    const { setOpen } = useModal();

    return (

        <div>
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
        
    

export default Header;