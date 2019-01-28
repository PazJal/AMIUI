//Offical requires:
const uuid = require('uuid').v4;

//Project requires:
const {amiPort , amiServer , amiUser , amiPassword} = require('../conf/asterisk-conf');
const {generateSipPeerStatusObject} = require('../asteriskActionGenerators/peerActions');

//Helper functions to parse information.
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
    const ami = new require('asterisk-manager')(amiPort, amiServer, amiUser, amiPassword, true);
    ami.keepConnected();
    //Setup the uuid for the request.
    const actionid = uuid();
    //Make info request
    ami.action(generateSipPeerStatusObject(actionid , peer) ,function (err ,res) {
      if(err){
        console.log(`Error - Unable to get peer status for ${peer}` , err);
      } else {
        console.log('PeerStatus results: ' , res);
      }
    });

    //First draft - incomplete - wait on all params to reach and compile a list. 
    let peerInfo;
    let isCompleted = false;
    //Listen for peers tatus update.
    ami.on('peerstatus' , function (event) {
      //Check that this is related to the request:
      if(event.actionid === actionid){
        console.log(event);
        peerInfo =  parseEventToPeer(event);
      }
    });
    //Listen for peer status end.
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
    //Set 1 second default timeout.
    setTimeout(() => {
      reject('Turd!');
    }, 1000);
  }
  );    
}

module.exports = {
  getPeerStatus
};