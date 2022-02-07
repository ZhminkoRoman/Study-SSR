import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Chat from './pages/Chat';
import ChatRooms from './pages/ChatRooms';

export default function App () {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/chatrooms" element={<ChatRooms />}/>
      </Routes>
    </>
  );
}
