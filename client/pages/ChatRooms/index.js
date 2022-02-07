import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import queryString from "query-string";
import socket from "../../service/socket";
import Title from '../../components/Title';
import  './styles.scss';

export default function ChatRooms () {
  const [room, setRoom] = useState();
  const [rooms, setRooms] = useState();
  const [name, setName] = useState();

  const location = useLocation();

  useEffect(() => {
    const { name } = queryString.parse(location.search);
    setName(name);
  }, [location.search]);

  useEffect(() => {
    socket.on('take-rooms', (rooms) => {
      setRooms(rooms);
    })
  }, [socket]);

  useEffect(() => {
    socket.on('take-rooms', (rooms) => {
      setRooms(rooms);
    });
    return function cleanUp () {
      socket.removeAllListeners('take-rooms');
    };
  }, []);

  const handleCreateRoom = () => {
    if (name && room) {
      socket.emit('create-room', { name, room });
    }
  }

  const handleJoinRoom = (user, chat) => {
    if (user && chat) {
      socket.emit('join-room', { name: user, room: chat });
    }
  };

  return (
    <div className="chatrooms">
      <Title
        first="Cheers"
        second=".Chats"
      />
      <div className="chatrooms_rooms">
        {rooms?.length
        ? (
          rooms.map((roomData, index) => {
            return (
              <Link
                key={roomData.room}
                className="chatrooms_room"
                style={{ backgroundColor: `rgb(${250 - (index * 5)}, ${203 - (index * 10)}, 75)`}}
                onClick={() => handleJoinRoom(name, roomData.room)}
                to={`/chat?name=${name}&room=${roomData.room}`}
              >
                {`Room "${roomData.room}"`}
              </Link>
            );
          })
         ) : (
           <p className="chatrooms_message">There is no any rooms yet</p>
         )
        }
      </div>
      <div className="chatrooms_wrapper">
        <input
          className="chatrooms_input"
          type="text"
          placeholder="Room ID..." 
          onChange={(event) => {setRoom(event.target.value)}}
        />
        <button className="chatrooms_link" onClick={handleCreateRoom}>Create a Room</button>
      </div>
    </div>
  );
}