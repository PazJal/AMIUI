const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const moment = require('moment');

const http = require('http');
const socketIO = require('socket.io');


//Trunk monitor setup:

//Data should be transmitted continounsly via websocket.

const {amiServer , amiUser , amiPassword , amiPort} = require('./conf/asterisk-conf');
const ami = new require('asterisk-manager')(amiPort, amiServer, amiUser, amiPassword, true);
ami.keepConnected();

 
const app = express();
const httpServer = http.createServer(app);
const io = socketIO(httpServer);

//Trunk monitor setup:

//Data should be transmitted continounsly via websocket.

io.on('connection' , function (socket) {
  console.log('new user connected.');
  let now = moment.now()
  ami.on('registry' , function(event) {
    console.log('Time since last emitted event is: ' ,moment(now - moment.now()).from(0));
    now = moment.now();
    console.log(event);
    const {domain} = event;
    const trunk = {
      domain,
      timestamp: now
    }
    socket.emit('trunkStatusUpdate' ,trunk);
    // updateTrunkInfo(trunk);
  });
  
  
});


const publicPath = path.join(__dirname, '..' , 'public');
const port = process.env.PORT || 3000;

const {placeCall} = require('./api/callDispatcher');
const {getQueueStatus} = require('./api/queueInformation');
const {getPeerStatus} = require('./api/peerInformation');
const {addMemberToQueue} = require('./api/addMemberToQueue');
const {removeMemberFromQueue} = require('./api/removeMemberFromQueue');


//Add some wierdo event listener:


app.use(express.static(publicPath));
app.use(bodyParser.json());

app.post('/place/:number' , (req , res , next) => {
  console.log(req);
  const {extCalling,numToCall} = req.body;
  console.log('body: ' , req.body);
  placeCall(numToCall,extCalling);
  res.send('Handled');
  next();
});

app.post('/queue/:queue' , async (req , res , next) => {
  console.log('body: ' , req.body);
  const queue = req.params.queue;
  const result = await getQueueStatus(queue);
  console.log(result);
  res.send(result);
  next();
});

app.post('/queue/add' , async (req , res , next) => {
  console.log('body: ' , req.body);
  const {nameToAdd , endpointToAdd, queueToAddTo} = req.body;
  const result = await addMemberToQueue(queueToAddTo , endpointToAdd , nameToAdd);
  console.log("Queue Add",result);
  res.send(result);
  next();
  
});

app.post('/queue/remove' , async (req , res , next) => {
  console.log('body: ' , req.body);
  const {nameToAdd , endpointToAdd, queueToAddTo} = req.body;
  const result = await removeMemberFromQueue(queueToAddTo , endpointToAdd , nameToAdd);
  console.log("Queue Remove" , result);
  res.send(result);
  next();
  
});


app.post('/peers' , async (req , res , next) => {
  console.log('body: ' , req.body);
  const peer = req.body.peer;
  const result = await getPeerStatus(peer);
  console.log(result);
  res.send(result);
  next();
  
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