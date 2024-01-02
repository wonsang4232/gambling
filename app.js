// app.js
const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const cors = require('cors');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
	secret: 'comibear',
	resave: false,
	saveUninitialized: true
  })
);

const passport = require('./config/passport-config');
app.use(passport.initialize());
app.use(passport.session());
app.use(flash())

app.set("view engine", "ejs");
app.set("views", __dirname + "/views"); // Not Necessary

// routes
app.use(require('./routes/index'));
app.use(require('./routes/auth'));
app.use(require('./routes/users'));
app.use(require('./routes/comment'));

// socket
const io = require('socket.io')(server);

io.on('connection', (socket)=>{
  console.log("User Connected !!", socket.id);
  socket.on('chat message', (msg) => {
		console.log(msg);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', async () => {
      console.log('user disconnected');
  });
});

app.use('/socket.io/socket.io.js', express.static('node_modules/socket.io/client-dist/socket.io.js'));

server.listen(3000, () => {
	console.log("Server listening at port 3000");
});