const http = require('http');
const io = require('socket.io')(http);

io.on('connection', (socket)=>{
  console.log("User Connected !!")
  socket.on('request_message', (msg) => {
      io.emit('response_message', msg);
  });

  socket.on('disconnect', async () => {
      console.log('user disconnected');
  });
});

module.exports = io;