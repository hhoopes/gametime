var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var players = {};
var gameBalls = [];
var playerNumbers = [4, 3, 2, 1];
var paddles = {
          '1': {player: 1, x: 10, y: (660 / 3), vertical: false},
          '2': {player: 2, x: 590, y: (660 / 3), vertical: false},
          '3': {player: 3, x: 10, y: (660 / 3)*2, vertical: false},
          '4': {player: 4, x: 590, y: (660 / 3)*2, vertical: false}
};

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/warlords.js', function(req, res) {
  res.sendFile(__dirname + '/main.bundle.js');
});

app.get('/css/index.css', function(req, res) {
  res.sendFile(__dirname + '/css/index.css');
});


app.get('/images/Warlords_guy.jpg', function(req, res) {
  res.sendFile(__dirname + '/images/Warlords_guy.jpg');
});


const PORT = process.env.PORT || 3000;

io.on('connection', function(socket){
  var readySignalSent = false;
  if (playerNumbers !== []) {
    playerInfo(socket);
  }

  socket.on('initialize', function() {
    socket.emit('initialize', players[socket.client.id]);
  });

  socket.on('ballPositions', function(balls){
    gameBalls = balls;
    io.emit('ballPositions', gameBalls);
  });

  socket.on('paddle', function(paddle){
    if (playerNumbers.length === 0 && readySignalSent === false) {
      readySignalSent = true;
      io.sockets.emit('ready', paddles);
    }
    paddles[paddle.player] = paddleLocation(paddle);
    io.emit('paddles', (paddles));
  });

  socket.on('disconnect', function() {
    playerNumbers.push(players[socket.client.id]);
    delete players[socket.client.id];
  });
});

http.listen(PORT);

function paddleLocation(paddleInfo) {
  var paddleString = {
    player: paddleInfo.player,
    x: paddleInfo.x,
    y: paddleInfo.y,
    vertical: paddleInfo.vertical
  };
  return paddleString;
}

function playerInfo(socket){
  players[socket.client.id] = playerNumbers.pop();
  return players[socket.client.id];
}
