import { useState, useEffect } from 'react';
import './App.css';
import io from 'socket.io-client';
import Messages from './Messages';
import MessageInput from './MessageInput';

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:4200`);
    
    setSocket(newSocket);
    console.log(newSocket)
    
    return () => newSocket.close();
  }, [setSocket]);

  return (
    <div className="App">
      <header className="app-header">
        React Chat
        
      </header>
      { socket ? (
        <div className="chat-container">
          
          <Messages socket={socket} />
          <MessageInput socket={socket} />
        </div>
      ) : (
        <div>Not Connected</div>
      )}
    </div>
  );
}


export default App;
