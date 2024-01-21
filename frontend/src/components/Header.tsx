import { ConnectKitButton } from 'connectkit';
const Header = () => {
    return (

        <header>
            <h1 className='project-name'>LFGHOSHOP</h1>
            {/* <nav>
            <ul>
            <li><a href='#'>Market</a></li>
            <li><a href='#'>My Items</a></li>
            </ul>
            </nav>   */}
            <div className='connect-button'>
            <ConnectKitButton />
            </div>
        </header>

        
        
    )
}   
        
    
    


export default Header;