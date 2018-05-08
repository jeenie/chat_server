var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.get('/', function(req, res){
    res.sendfile('client.html');
});

server.listen(3000, function(){
  console.log('listen on * : 3000');
});
