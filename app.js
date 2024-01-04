// app.js
const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const cors = require('cors');

// No CORS
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
	secret: 'comibear',
	resave: false,
	saveUninitialized: true
  })
);

// Passport Authentication
const passport = require('./config/passport-config');
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()) // Flash msg

app.set("view engine", "ejs");
app.set("views", __dirname + "/views"); // Not Necessary

// routes
app.use(require('./routes/index'));
app.use(require('./routes/auth'));
app.use(require('./routes/users'));
app.use(require('./routes/comment'));
app.use(require('./routes/chat'));

// socket
const ChatSocket = require('./controller/chatController');
ChatSocket.ChatSocket(server);

app.use('/socket.io/socket.io.js', express.static('node_modules/socket.io/client-dist/socket.io.js')); // Why not default?

// public
app.use(express.static('public'));

// listen port 3000
server.listen(3000, () => {
	console.log("Server listening at port 3000");
});

module.exports = server;