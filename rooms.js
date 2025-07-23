const rooms = {
    //  room123: {
    //roomid:...
    //host:socket123,
    // players: [
    //   { id: 'socket123', name: 'Alice', knowsAnimal: true },
    //   { id: 'socket456', name: 'Bob', knowsAnimal: false },
    //   // etc.
    // ],
    // animal: 'lion',
    //}
}

const animals =  [
    "Lion",
  "Tiger",
  "Elephant",
  "Giraffe",
  "Zebra",
  "Panda",
  "Kangaroo",
  "Koala",
  "Gorilla",
  "monkey",
  "Crocodile",
  "Alligator",
  "Wolf",
  "Fox",
  "Bear",
  "Polar Bear",
  "Dolphin",
  "Whale",
  "Shark",
  "Penguin",
  "Eagle",
  "Owl",
  "Camel",
  "Horse",
  "Dog",
  "Cat"
]

let createRoom = (hostId,hostName) => {
    //generate a random room id
    let roomId = Math.random().toString(36).substring(2, 6);
    let index = Math.floor(Math.random() * animals.length);
    let animal = animals[index];

    rooms[roomId] = {
        roomId:roomId,
        host: hostId,
        players: [{id: hostId,name: hostName,knowsAnimal:true}],
        animal:animal,
    };

    return roomId;
}

let joinRoom = (playerId,playerName,roomId) => {
      if (!rooms[roomId]) return false;
    rooms[roomId].players.push({id:playerId,name:playerName,knowsAnimal:true});
    return true;
}

let leaveRoom = (playerId,roomId) => {
    if(!rooms[roomId]) return;
    rooms[roomId].players= rooms[roomId].players.filter(p => p.id != playerId);
    if(rooms[roomId].players.length == 0) delete rooms[roomId];   
    if (rooms[roomId].host == playerId) {   
       rooms[roomId].host = rooms[roomId].players[0].id;
    }
}
let getPlayerData = (playerId,roomId) => {
    if(!rooms[roomId]) return;
    let playerData = {};
    if(rooms[roomId].host == playerId){
        playerData.isHost = true;
    }
    else {
        playerData.isHost=false;
    }

    playerData.id = playerId;
    const playerObj = rooms[roomId].players.find(p => p.id === playerId);
    if (playerObj) {
        playerData.name = playerObj.name;
        playerData.knowsAnimal = playerObj.knowsAnimal;
    }
    return playerData;
}
let getData = (roomId) => {
    return rooms[roomId];

}

module.exports = {createRoom,joinRoom,leaveRoom,getData,getPlayerData}