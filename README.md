# Wild Suspect

A multiplayer game where one impostor doesnt know the animal other players do and they need to guess him.

# project information

## Features
- multiplayer rooms
- real-time updates using socket.io
- responsible ui using tailwind

## tech stack
- Frontend: React, Vite, Tailwind CSS, Sockets
- Backend: Node.js, Express.js, Socket.io
- Deployment: Vercel (frontend), Render (backend)

## Usage
- a player creates a room
- other players join the room using the room code
- the host(creator) starts the game
- each player gets a card
- the card reveals if they are impostor or not
- players start asking question to find out the impostor then they vote
- the impostor tries ti guess the animal
- scores are shown and host can start the game again with the same players
