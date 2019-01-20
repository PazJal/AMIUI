const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
 
const app = express();
const publicPath = path.join(__dirname, '..' , 'public');
const port = process.env.PORT || 3000;

const {placeCall} = require('./api/callDispatcher');
const {getQueueStatus} = require('./api/queueInformation');


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

app.listen(port , () => {
  console.log('server is up on port' , port);
});