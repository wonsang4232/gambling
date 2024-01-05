
function joinRoom(roomcode) {
  socket.emit('JoinRoom', {playername: "playername", roomcode: roomcode});

  console.log(roomcode);

  socket.on('Room Joined', (data) => {
    if (roomcode === data.roomcode) {
      const currentPath = window.location.pathname;
      window.location.replace(currentPath + '/' + roomcode);
    } else {
      alert('Something Wrong!! Try again');
    }
  })
}

socket.on("Error", (err) => {{
  alert(err.error);
}})

function createRoom(hostname) {
  console.log(hostname);
  socket.emit('CreateRoom', {'hostname': hostname});

  socket.on('roomCreated', (data) => {
    console.log('Room created with code: ', data.roomcode);
    console.log('Your player ID: ', data.socketID);

    let nowRoomCode = data.roomcode;
    // let mySocketID = data.socketID;

    const currentPath = window.location.pathname;
    window.location.replace(currentPath + '/' + nowRoomCode);
  });
}