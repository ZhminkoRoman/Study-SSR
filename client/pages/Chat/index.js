import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import queryString from "query-string";
import ScrollToBottom from 'react-scroll-to-bottom';
import socket from "../../service/socket";
import './styles.scss';

function Chat() {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const [name, setName] = useState();
  const [room, setRoom] = useState();

  const location = useLocation();

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    setName(name);
    setRoom(room);
  }, [location.search]);

  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        room,
        author: name,
        message: currentMessage,
        time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send-message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage('');
    };
  };

  useEffect (() => {
    socket.on('receive-message', (data) => {
      setMessageList((list) => [...list, data]);
    });
    socket.on('notification', (data) => {
      console.log(data);
      setNotifications((notes) => [...notes, data])
    })
  }, [socket]);

  useEffect(() => {
    return function cleanUp () {
      socket.removeAllListeners('receive-message', 'notification');
    };
  }, []);

  return (
    <div className="chat">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <ScrollToBottom className="chat_wrapper">
        <div className="chat-body">
          {notifications.map((note) => {
            return (
              <div className="notification">
                <p className="notification_author">{`${note.user}: `}</p>
                <p className="notification_text">{`${note.text}`}</p>
              </div>
            )
          })}
          {messageList.map((message) => {
            return (
              <div className={message.author === name ? 'chat_holder' : 'chat_others'}>
                <p className={message.author === name 
                  ? 'message_author-holder' 
                  : 'message_author-others'}
                >{message.author}</p>
                <p className={message.author === name 
                  ? 'message-holder' 
                  : 'message-others'}>{message.message}</p>
                <p className={message.author === name 
                  ? 'message_time-holder' 
                  : 'message_time-others'}>{message.time}</p>
              </div>
            )
          })}
        </div>
      </ScrollToBottom>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="Hey..."
          value={currentMessage}
          onChange={(event) => {
            setCurrentMessage(event.target.value)
          }}
          onKeyPress={(event) => {
            event.key === 'Enter' && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;
