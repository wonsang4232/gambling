const socketio = require('socket.io');

exports.renderChatpage = (req, res) => {
  if (req.user) {
    res.render('chat');
  } else {
    req.flash('error', 'You need to login first to chat with others.');
    res.redirect('login');
  }
}

exports.Chatroom = (req, res) => {
  if (req.user) {
    res.render('chatroom');
  } else {
    req.flash('error', 'You need to login first to chat with others.');
    res.redirect('login');
  }
}

exports.ChatSocket = (server) => {
  const io = socketio(server);
  const chatsocket = io.of('/chat');

  let rooms = {};

  function generateRoomCode() {
    let roomCode;
    do {
        roomCode = Math.floor(100000 + Math.random() * 900000).toString();
    } while (rooms[roomCode]);
    return roomCode;
  }

  chatsocket.on('connection', (socket) => {
    console.log("User Connected : ", socket.id);

    socket.on("CreateRoom", (data) => {
      const hostName = data.hostname;
      let roomcode = generateRoomCode();

      rooms[roomcode] = {
        host: socket.id, 
        players: [socket.id], 
        playerName: [hostName], 
        numOfPlayer: 1,
      };

      socket.join(roomcode);

      socket.emit('roomCreated',
        {roomcode, 
        socketID: socket.id,
        playerNames: rooms[roomcode].playerName
      });

      console.log('room Created!:', roomcode);
      console.log('All existing room codes:', Object.keys(rooms).join(', '));

    }) 

    socket.on("JoinRoom", (data) => {
      var roomcode = data.roomcode;

      if (rooms[roomcode]) {
        console.log("joined");
        rooms[roomcode].numOfPlayer += 1;
        rooms[roomcode].playerName.push(data.playername);
        rooms[roomcode].players.push(socket.id);

        socket.join(roomcode);

        console.log(rooms[roomcode]);

        chatsocket.to(roomcode).emit('Room Joined', {
          roomcode,
          socketID: socket.id,
          playerNames: rooms[roomcode].playerName
        })
      } else {
        chatsocket.to(socket.id).emit('Error', {error: "Room not found!!"});
      }
    })

    socket.on('disconnect', async () => {
        console.log('user disconnected');
    });
  });
};