import React, { useState, useRef } from 'react';
import './App.css';
import ChatRoom from './ChatRoom';

function App() {
  const { count, messages, sendMessage } = ChatRoom();
  const [newMessage, setNewMessage] = useState("");
  const messageRef = useRef();

  const handleSendMessage = () => {
    if ( newMessage ) {
      sendMessage(newMessage);
      setNewMessage("");
    }
  };

  const handleNewMessageChange = (e) => {
    e.preventDefault();
    setNewMessage(e.target.value)
  }

  const handleKeyUp = (e) => {
    if(e.key === "Enter"){
      sendMessage(newMessage);
      setNewMessage("");
    }
  }

  console.log(messages)
  return (
    <div className="App">
      <div className="container">
        <p>{ count } in this chat room.</p>
        <div className="message-container">
          <ul>
            { messages.map((message, i) => (
                  message.body !== "" ? (
                    <li key={i}>
                      { message.senderId } { message.body }
                    </li>
                  ) : null
            ))}
          </ul>
          <div ref={ messageRef }></div>
        </div>
        <div className="action-container">
          <input
            className="message-input"
            placeholder="enter message here"
            variant="outlined"
            value={ newMessage }
            onChange={ handleNewMessageChange }
            onKeyUp = { handleKeyUp }
          />
          <button
            disabled = { newMessage === "" }
            onClick={handleSendMessage}
            className="send-button"
          >
            Send
          </button>
        </div>
    </div>
    </div>
  );
}

export default App;
