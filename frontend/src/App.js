import { useState, useEffect } from 'react';
import './App.css';
import io from 'socket.io-client';
import Messages from './Messages';
import MessageInput from './MessageInput';

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`https://chat-app-bobble.herokuapp.com`);
    //add comment
    
    setSocket(newSocket);
    console.log(newSocket)
    
    return () => newSocket.close();
  }, [setSocket]);

  return (
    <div className="App">
      
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
