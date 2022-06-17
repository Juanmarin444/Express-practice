const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const formatMessage = require("./utils/messages");
const { userJoin, getCurrentUser, userLeaves, getRoomUsers } = require("./utils/users")


const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

const botName = "Chat-bot";

// Run when a client connects
io.on("connection", (socket) => {
    socket.on("joinRoom", ({ username, room }) => {
        const user = userJoin(socket.id, username, room);

        socket.join(user.room)

        // Welcome a new client - Emits to the current client only
        socket.emit("message", formatMessage(botName, `Welcome to the ${user.room} room in Chat App, ${user.username}.`));

        // Broadcast when a user connects - Emits to everyone except the current client
        socket.broadcast.to(user.room).emit("message", formatMessage(botName, `${user.username} has joined the ${user.room} chat.`));

        // Send users and room info
        io.to(user.room).emit("roomUsers", {
            room: user.room,
            users: getRoomUsers(user.room)
        });
    });

    // Listen for chatMessage
    socket.on("chatMessage", (msg) => {
        const user = getCurrentUser(socket.id);

        io.to(user.room).emit("message", formatMessage(user.username, msg));
    });
    
    // Runs when a client disconnects - Emits to all the clients
    socket.on("disconnect", () => {
        const user = userLeaves(socket.id);

        if(user) {
            io.to(user.room).emit("message", formatMessage(botName, `${user.username} has left the chat.`));

            // Send users and room info
            io.to(user.room).emit("roomUsers", {
                room: user.room,
                users: getRoomUsers(user.room)
            });
        }

    });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => {
    console.log(`Server Started on Port:${PORT}...`);
})