const {port , server , user , password} = require('../conf/asterisk-conf');
const uuid = require('uuid').v4;

const parseEventToPeer = (event) => {
  const {channeltype, peer, peerstatus, privlege, time} = event;
  return {
    channeltype, peer, peerstatus, privlege, time
  };
}



//A function that queries the AMI regarding a certain queue status.

const getPeerStatus = (peer) => {
  /*
    TODO: At the moment is set to a hardcoded queue. 
      1) Add input validation
      2) Set to work with input - Done , add tests.
      3) Add error handling.
      4) Add a real uuid. - Done, add test.
      5) Test multiple simultaneoues requests.
  */

  //Return promise - Async request.
  return new Promise(function (resolve , reject) {
    //Set up conneciton: 
    const ami = new require('asterisk-manager')(port, server, user, password, true);
    // console.log('Processing queue status request.');
    ami.keepConnected();
    const actionid = uuid();
    //Make info request
    ami.action({
      'action': 'sippeerstatus',
      actionid,
      peer 

    } ,function (err ,res) {
      if(err){
        console.log('An errror has occred' , err);
      } else {
        console.log('Queue add results: ' , res);
      }
    });

    //First draft - incomplete - wait on all params to reach and compile a list. 
    let members = [];
    let peerInfo;
    let isCompleted = false;
    //Catch all params:
    ami.on('managerevent' , function (event) {
      console.log(event);
    });


    ami.on('peerstatus' , function (event) {
      //Check that this is related to the request:
      if(event.actionid === actionid){
        console.log(event);
        peerInfo =  parseEventToPeer(event);
      }
      
    });
    ami.on('sippeerstatuscomplete' , function(event) {
      console.log('Completed!');
      if(event.actionid === actionid){
        isCompleted = true;
        resolve({
          isCompleted,
          peerInfo
        });
      }
    });
    //Data pull complete:
    setTimeout(() => {
      reject('Turd!');
    }, 1000);
  }
  );    
}


module.exports = {
  getPeerStatus
};