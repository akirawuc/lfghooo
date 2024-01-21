import { ConnectKitButton } from 'connectkit';
const Header = () => {
    return (

        <header>
            <div className='project-name'><img src='https://i.postimg.cc/QMWjbQg5/Gho-01.png' /></div>
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