var socket = io("/chat", {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 5,
  forceNew: false
});
// var messages = document.getElementById('messages');
// var form = document.getElementById('form');
// var input = document.getElementById('input');

socket.on("New User", (data) => {
  console.log(data);
})

socket.on("Message", (msg) => {
  console.log(msg);
})

function CreateMessage(msg) {
  socket.emit("New message", {'msg': msg});
}