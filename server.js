var app = require('express')();
var server = require('http').createServer(app);
//socket.io의 새로운 인스턴스를 초기화해서 http 서버 객체에 전달
var io = require('socket.io')(server);

app.get('/', function(req, res){
    res.sendfile(__dirname + '/client.html');
});

//들어오는 socket을 위한 connection 이벤트 대기
io.on('connection', function(socket){

  //연결이 끊기면 콘솔에 상태출력
  socket.on('disconnect', function(){
    console.log('user disconnected : ' + socket.name);
  });

  //전송메시지 작성후 send버튼 클릭시 console에 데이터 출력
  socket.on('chat', function(data) {
    io.emit('chat', data);
  });
});

server.listen(3000, function(){
  console.log('chat server on * : 3000');
});
