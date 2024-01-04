const socketio = require('socket.io');

exports.rendergenerateRoom = (req, res) => {

}

exports.renderChatpage = (req, res) => {
  if (req.user) {
    res.render('chat');
  } else {
    req.flash('error', 'You need to login first to chat with others.');
    res.redirect('login');
  }
}

exports.ChatSocket = (server) => {
  const io = socketio(server);
  const chatsocket = io.of('/chat');

  chatsocket.on('connection', (socket) => {
    const req = socket.request;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('New Client Connected!', ip, socket.id);



    socket.on('chat message', (data) => {
      console.log(data);
      chatsocket.emit('chat message', data.msg);
    });

    socket.on('disconnect', async () => {
        console.log('user disconnected');
    });
  });
};