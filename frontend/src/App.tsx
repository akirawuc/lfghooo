import { ConnectKitButton } from 'connectkit';
import './style.css';

function App() {
  return (
    <div>
      <head>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap');
      </style>  
      </head>
      <header>
        <h1 className='project-name'>LFGHO</h1>
        <nav>
        <ul>
          <li><a href='#'>Home</a></li>
          <li><a href='#'>Create</a></li>
        </ul>
      </nav>  
      <div className='connect-button'>
        <ConnectKitButton />
        </div>
      </header>
      
      
    </div>
  );
}

export default App;
