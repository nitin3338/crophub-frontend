// context/socketContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/slices/userSlice';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const user = useSelector(selectUser);
  const socket = io('https://cdn-route.crophub.in', {
    withCredentials: true,
    transports: ['websocket'],
   });

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected');
      if (user && user?.user?._id){
        socket.emit('register', user?.user?._id);
      }
    })

    return () => {
      socket.off('connect');
      // ... remove other listeners ...
    };
  
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
