var socket = io("/chat", {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 5,
  forceNew: false
});

function joinRoom(roomcode) {
  socket.emit('Join Room', {playername: "playername", roomcode: roomcode});

  socket.on('Room Joined', (data) => {
    if (roomcode === data.roomcode) {
      const currentPath = window.location.pathname;
      window.location.replace(currentPath + '/' + roomcode);
      socket.emit("Joining", {user: socket.id, roomcode: roomcode});
    } else {
      alert('Something Wrong!! Try again');
    }
  })
}

function createRoom(hostname) {
  socket.emit('Create Room', {'hostname': hostname});

  socket.on('Room Created', (data) => {
    console.log('Room created with code: ', data.roomcode);
    console.log('Your player ID: ', data.socketID);

    const currentPath = window.location.pathname;
    window.location.replace(currentPath + '/' + data.roomcode);
    socket.emit("Joining", {'user': socket.id, 'roomcode': roomcode});
    alert("wow!!!");
  });
}

socket.on("Error", (err) => {{
  alert(err.error);
}})