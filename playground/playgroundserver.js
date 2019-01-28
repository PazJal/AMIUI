const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const moment = require('moment');

const http = require('http');
const socketIO = require('socket.io');

const {amiServer , amiUser , amiPassword , amiPort} = require('../server/conf/asterisk-conf');
const ami = new require('asterisk-manager')(amiPort, amiServer, amiUser, amiPassword, true);
ami.keepConnected();

 
const app = express();
const httpServer = http.createServer(app);
const io = socketIO(httpServer);

const publicPath = path.join(__dirname, '..' , 'public');
const port = process.env.PORT || 3000;


app.use(express.static(publicPath));
app.use(bodyParser.json());

ami.on('managerevent', function(event) {
  console.log('Playground event: ' ,event);
});

//Add Queue member;
// ami.action({
//   action: 'queueadd',
//   actionid: '123',
//   queue:1000,
//   interface: 'SIP/999',
//   penalty: 0,
//   paused: false,
//   membername: 'FunkyBitch',
// });

//Remove queue member:
ami.action({
  action: 'queueremove',
  actionid: '123',
  queue:1000,
  interface: 'SIP/999',
});

app.get('*' ,(req , res , next) => {
  if(req.path.includes('/place')){
    next();
  } else {
    try {
      res.sendFile(path.join(publicPath , 'index.html'));
    } catch(e){
      console.log('Errrror! : ' , e);
    };
  }
  
  
});






httpServer.listen(port , () => {
  console.log('server is up on port' , port);
});