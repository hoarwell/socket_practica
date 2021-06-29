import { useState, useEffect, useRef } from 'react';
import socketIOClient from 'socket.io-client';

const NEW_MESSAGE_EVENT = "new-message-event";
const SOCKET_SERVER_URL = "http://172.30.1.17:3030";

const ChatRoom = () => {
    const [messages, setMessages] = useState([]);
    const [count, setCount] = useState("");
    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = socketIOClient(SOCKET_SERVER_URL);
        socketRef.current.on(NEW_MESSAGE_EVENT, (message) => {
            const incomingMessage = {
                ...message,
                isOwner: message.senderId === socketRef.current.id,    
            };
            setMessages((messages) => [...messages, incomingMessage]);
        });

        socketRef.current.on('usercount', (count) => {
            setCount(count);
        });

        return (() => {
            socketRef.current.disconnect();
        })
    }, []);

    const sendMessage = (messageBody) => {
        socketRef.current.emit(NEW_MESSAGE_EVENT, {
            body: messageBody,
            senderId: socketRef.current.id,
        })
    }

    return { count, messages, sendMessage }
}

export default ChatRoom;;