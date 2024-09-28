import logo from './logo.svg';
import './App.css';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Google Calendar GroupSync
        </p>
      </header>
    </div>
  );
}

export default App;
