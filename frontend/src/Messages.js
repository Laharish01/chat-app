import React, { useEffect, useState } from 'react';
import './Messages.css';

function Messages({ socket }) {
  const [messages, setMessages] = useState({});

  useEffect(() => {
    const messageListener = (message) => {
      setMessages((prevMessages) => {
        //console.log('prev', prevMessages);
        //console.log('cur', message);
        const newMessages = {...prevMessages};
        newMessages[message.id] = message;
        //console.log('total', newMessages);
        return newMessages;
      });
    };
  
    const deleteMessageListener = (messageID) => {
      setMessages((prevMessages) => {
        const newMessages = {...prevMessages};
        delete newMessages[messageID];
        return newMessages;
      });
    };
  
    socket.on('message', messageListener);
    socket.on('deleteMessage', deleteMessageListener);
    socket.emit('getMessages');

    return () => {
      socket.off('message', messageListener);
      socket.off('deleteMessage', deleteMessageListener);
    };
  }, [socket]);

  return (
    <div className="message-list">
      {[...Object.values(messages)]
        
        .map((message) => (
          <div
            key={message.id}
            className="message-container"
            
          >
            <span className="user">{message.user.name}:</span>
            <span className="message">{message.value}</span>
            
          </div>
        ))
      },
      
    </div>
  );
}

export default Messages;