var app = require('express')();
var server = require('http').createServer(app);
//socket.io의 새로운 인스턴스를 초기화해서 http 서버 객체에 전달
var io = require('socket.io')(server);

app.get('/', function(req, res){
    res.sendfile(__dirname + '/client.html');
});

//들어오는 socket을 위한 connection 이벤트 대기
//parameter로 들어오는 socket => 접속한 사용자에 대한 object
io.on('connection', function(socket){
  //login 이벤트 처리
  socket.on('login', function(name) {
    var user = name;
    console.log('client logged-in: \n socketId:' + socket.id + '\n name: ' + user);

    //socket에 클라이언트 정보 저장
    socket.name = user;

    io.to(socket.id).emit('change name', user);
  });

  //연결이 끊기면 콘솔에 상태출력
  socket.on('disconnect', function(){
    console.log('user disconnected : ' + socket.id);
  });

  //전송메시지 작성후 send버튼 클릭시 console에 데이터 출력
  socket.on('send', function(name, msg) {
    //닉네임과 전달 메세지 조합
    var message = name + ' : ' + msg;
    console.log(msg);
    //emit() : 모든 접속자에게 메세지 전송
    io.emit('receive', message);
  });
});

server.listen(3000, function(){
  console.log('chat server on * : 3000');
});
