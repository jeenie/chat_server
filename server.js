var app = require('express')();
var server = require('http').createServer(app);
//socket.io의 새로운 인스턴스를 초기화해서 http 서버 객체에 전달
var io = require('socket.io')(server);

app.get('/', function(req, res){
    res.sendfile('client.html');
});

//들어오는 socket을 위한 connection 이벤트 대기 => 콘솔 대기로 처리
io.on('connection', function(socket){
  console.log('a user connected');
  //연결이 끊기면 콘솔에 상태출력
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('chat', function(msg) {
    console.log('message : ' + msg);
  });
});

server.listen(3000, function(){
  console.log('listen on * : 3000');
});
