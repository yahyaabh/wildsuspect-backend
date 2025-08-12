const {createRoom,joinRoom,leaveRoom,getData,getPlayerData,startGame,voteForPlayer,getAnimals,validateAnimal}=require("./rooms");

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
            let playerData= getPlayerData(socket.id,roomid);
            socket.emit("roomCreated",playerData);
            //send to all users data
            let data = {};
            data=getData(roomid);
            io.to(roomid).emit("roomUpdated",data);
                })

        //he clicked joinRoom
        socket.on('joinRoom',({playerName,roomId}) => {
            if(joinRoom(socket.id,playerName,roomId)){
            socket.join(roomId);
            let playerData=getPlayerData(socket.id,roomId);
            socket.emit("roomJoined",playerData);
            let data ={};
            data=getData(roomId);
            io.to(roomId).emit("roomUpdated",data);
            }
        })
        //handle leaving room
        socket.on("leaveRoom", ()=> {
            const [roomId] = [...socket.rooms].filter(id => id !== socket.id);
            leaveRoom(socket.id,roomId);
            let data={};
            data=getData(roomId);
            io.to(roomId).emit("roomUpdated",data);
        })

        socket.on("startgame",({roomId})=> {
            if(startGame(roomId)){
                let roomData = getData(roomId);
                let playerData = getPlayerData(socket.id,roomId);
                socket.emit("playerDataUpdated",playerData);
                io.to(roomId).emit("gameStarted",roomData);
            }
        })

        //he disconnected (no need to click anything handled by lib)
        socket.on('disconnecting', () => {
            const [roomId] = [...socket.rooms].filter(id => id !== socket.id);
            leaveRoom(socket.id,roomId);
            let data={};
            data=getData(roomId);
            io.to(roomId).emit("roomUpdated",data);
        })
        //when client req to upadte player data
        socket.on("updatePlayerData", () => {
            const [roomId] = [...socket.rooms].filter(id => id !== socket.id);
            let playerData = getPlayerData(socket.id,roomId);
            socket.emit("playerDataUpdated",playerData);

        })
        //user votes from fronted
        socket.on('playerVoted',({votedId}) => {
             const [roomId] = [...socket.rooms].filter(id => id !== socket.id);
            let nbOfVotes = voteForPlayer(socket.id,votedId,roomId);
            io.to(roomId).emit("userHasVoted",nbOfVotes);
        })


        socket.on("impostorIsGuessing",() => {
            const [roomId] = [...socket.rooms].filter(id => id !== socket.id);
            let arr= getAnimals(roomId);
            socket.emit("animalsArraySent",arr);
        })

        //
        socket.on("impostorPickedAnimal",({animal}) => {
            const [roomId] = [...socket.rooms].filter(id => id !== socket.id);
            validateAnimal(roomId,socket.id,animal);
            io.to(roomId).emit("impostorHasGuessed");
        })

        //
        socket.on("getResults", () => {
             const [roomId] = [...socket.rooms].filter(id => id !== socket.id);
            let data={};
            data=getData(roomId);
            io.to(roomId).emit("roomUpdated",data);
        })

         socket.on('disconnect', () => {
            console.log(`Socket disconnected: ${socket.id}`);
    });

    });
}