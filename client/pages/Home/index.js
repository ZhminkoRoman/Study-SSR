import React, { useState } from "react";
import { Link } from "react-router-dom";
import socket from "../../service/socket";
import Title from '../../components/Title';
import  './styles.scss';

export default function Home () {
  const [name, setName] = useState();
  const [room, setRoom] = useState('common');

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleCreateUser = () => {
    socket.emit('create-user', { name, room });
  }

  return (
    <div className="home">
      <Title
        first="Cheers"
        second=".Chats"
      />
      <div className="home_wrapper">
        <input 
          className="home_wrapper_input"
          type="text"
          placeholder="Enter your name"
          onChange={handleChangeName}
        />
        <Link
          className="home_wrapper_link"
          to={`/chatrooms?name=${name}`}
          onClick={handleCreateUser}
        >
          Join Cheerts
        </Link>
      </div>
    </div>
  );
}
