const rooms = {
    //  room123: {
    // players: [
    //   { id: 'socket123', name: 'Alice', knowsAnimal: true },
    //   { id: 'socket456', name: 'Bob', knowsAnimal: false },
    //   // etc.
    // ],
    // animal: 'lion',
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
    let roomId = Math.random().toString(36).substring(2, 15);
    let index = Math.floor(Math.random() * animals.length);
    let animal = animals[index];

    rooms[roomId] = {
        host: playerId,
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
}

let getData = () => {
    return rooms;

}

module.exports = {createRoom,joinRoom,leaveRoom,getData}