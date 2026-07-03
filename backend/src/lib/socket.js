import express from 'express';
import http from 'http';
import { Server } from 'socket.io';


const app = express();
const server = http.createServer(app);


const io = new Server(server, {cors: { origin: [allowedOrigin] }});

const userSocketMap = {};
io.on('connection', (socket)=>{
    const userID = socket.handshake.query.userID;
    if(userID) userSocketMap[userID] = socket.id;

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on('disconnect',()=>{
        if(userID) delete userSocketMap[userID];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

const getReceiverSocketId = (receiverID) => {
    return userSocketMap[receiverID];
};

export { app, io, userSocketMap, server, getReceiverSocketId };