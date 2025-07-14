import { createRoom,getData,joinRoom,leaveRoom,getData} from "./rooms";

module.exports = (io) => {
    //some user made a connection the website
    io.on('connection',(socket) => {
        // Log the connection
        console.log('a user connected:', socket.id);
        
        //he clicked create room
        socket.on('createRoom',({hostName}) => {
            let roomid = createRoom(socket.id,hostName);
            socket.join(roomid);
            //send a message for the user , with room id
            socket.emit("roomCreated",roomid);
            //send to all users data
            let data = getData();
            io.to(roomid).emit("roomUpdated",data);
                })

        //he clicked joinRoom
        socket.on('joinRoom',({playerName,roomId}) => {
            if(joinRoom(socket.id,playerName,roomId)){
            socket.join(roomId);
            socket.emit("roomJoined");
            io.to(roomId).emit("roomUpdated",data);
            }
        })

        //he disconnected (no need to click anything handled by lib)
        socket.on('disconnecting', () => {
            const [roomId] = [...socket.rooms].filter(id => id !== socket.id);
            leaveRoom(socket.id,roomId);
            io.to(roomId).emit("roomUpdated",data);
        })
    });
}