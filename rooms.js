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
        players: [{id: hostId,name: hostName,knowsAnimal:true,votedFor:"",points:0}],
        animal:animal,
        nbOfVotes:0
    };

    return roomId;
}

let joinRoom = (playerId,playerName,roomId) => {
      if (!rooms[roomId]) return false;
    rooms[roomId].players.push({id:playerId,name:playerName,knowsAnimal:true,votedFor:"",points:0});
    return true;
}

let leaveRoom = (playerId,roomId) => {
    if(!rooms[roomId]) return;
    rooms[roomId].players= rooms[roomId].players.filter(p => p.id != playerId);
    if(rooms[roomId].players.length == 0) {
        delete rooms[roomId];   
        return;
    }
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

    // playerData = {
    //     isHost:true,
    //     playerId:123,
    //     playerName:...,
    //     knowsAnimal:true
    // }
}
let getData = (roomId) => {
    return rooms[roomId];

}

let startGame = (roomId) => {
    const nbofPlayers = rooms[roomId].players.length;
    rooms[roomId].nbOfVotes = 0;
    const randomIndex = Math.floor(Math.random() * nbofPlayers);
    // Reset all players' knowsAnimal to true
    rooms[roomId].players.forEach(player => {
        player.knowsAnimal = true;
        player.votedFor = "";
    });
    //choose animal
     let index = Math.floor(Math.random() * animals.length);
    let animal = animals[index];
    rooms[roomId].animal=animal;
    //

    // Assign false to the selected player
    rooms[roomId].players[randomIndex].knowsAnimal = false;
    return true;
}

const voteForPlayer = (playerId,votedId,roomId) => {
    rooms[roomId].players.forEach(player => {
        if(player.id == playerId){
            player.votedFor = votedId;
        }
    })

    let impostorId = rooms[roomId].players.find((player) => player.knowsAnimal == false)?.id;
    
    if(votedId == impostorId) {
        rooms[roomId].players.forEach((player) => {
            if(player.id == playerId){
                player.points = player.points+2;
            }
        })
    }
     rooms[roomId].nbOfVotes++;
     return rooms[roomId].nbOfVotes;
}

const getAnimals = (roomId) => {
    let animalsArr = [];
    for(i=0;i<5;i++){
        let animal = animals[Math.floor(Math.random() * animals.length)];
        if(!animalsArr.includes(animal)){
            animalsArr.push(animal);
        }
    }
    animalsArr.push(rooms[roomId].animal);
    animalsArr.sort(() => Math.random() - 0.5);
    return animalsArr;
}

const validateAnimal = (roomId,playerId,animal) => {
    if(animal == rooms[roomId].animal) {
        rooms[roomId].players.forEach((player) => {
            if(player.id == playerId) {
                player.points += 3;
            }
        })
    }
}

module.exports = {createRoom,joinRoom,leaveRoom,getData,getPlayerData,startGame,voteForPlayer,getAnimals,validateAnimal}