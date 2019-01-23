const {amiPort , amiServer , amiUser , amiPassword} = require('../conf/asterisk-conf');
const {generateAgentLoginObject , generateAgentLogoutObject} = require('../api/queueActions');

const getQueueStatus = (queue) => {

  return new Promise(function (resolve , reject) {
    //Set up conneciton: 
    const ami = new require('asterisk-manager')(amiPort, amiServer, amiUser, amiPassword, true);
    console.log('Processing queue status request.');
    ami.keepConnected();
    const actionid = '123456';
    //Make info request
    ami.action({
      'action': 'queuestatus',
      actionid,
      'queue': '1002'

    } ,function (err ,res) {
      if(err){
        console.log('An errror has occred' , err);
      } else {
        console.log('Queue add results: ' , res);
      }
    });
    //First draft - incomplete - wait on all params to reach and compile a list. 
    let members = [];
    let queueInfo;
    let isCompleted = false;
    //Catch all params:
    ami.on('queueparams' , function (event) {
      //Check that this is related to the request:
      if(event.actionid === actionid){
        console.log(event);
        queueInfo = event;
      }
      
    });

    ami.on('queuemember' , function(event) {
      //Check that this is related to the request:
      if(event.actionid === actionid){
        console.log(event);
        const member = {
          callsTaken:  event.callstaken,
          sinceLastCall: event.lastcall,
          name: event.name,
          paused: !!event.paused,
          queue: event.queue,
          stateInterface: event.stateinterface,
          status: event.status
        }
        members.push(member);
      }
    });
    ami.on('queuestatuscomplete' , function(event) {
      console.log('Completed!');
      isCompleted = true;
      resolve({
        isCompleted,
        queueInfo,
        members
      });
    });
    //Data pull complete:
    setTimeout(() => {
      reject('Turd!');
    }, 1000);
  }
  );    
}
    
    
const placeCall = (number , extension) => {
  var ami = new require('asterisk-manager')(port, server, user, password, true);
  // ami.on('queuemember' , function (event) {
  console.log('Started.');
  
  // In case of any connectiviy problems we got you coverd.
  ami.keepConnected();
  
  // Listen for any/all AMI events.
  ami.on('managerevent', function(evt) {
    console.log(evt.event);
    
  });




  const numToCall = Number.parseInt(number) ? number : 101;
  const extensionString = `SIP/${extension}`;

  ami.action({
    'action':'originate',
    'channel':extensionString,
    'context':'from-internal',
    'exten': numToCall,
    'priority':1,
    'variable':{
      'name1':'value1',
      'name2':'value2'
    }
  }, function(err, res) {
    if(err) {
      console.log('An error has occured! ' , err);
    }
  });
}


module.exports = {
  placeCall,
  getQueueStatus
};