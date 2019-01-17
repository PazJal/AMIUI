const {port , server , user , password} = require('../conf/asterisk-conf');

const util = require('util');

const placeCall = (number , extension) => {
  var ami = new require('asterisk-manager')(port, server, user, password, true);
  console.log('Started.');
  
  // In case of any connectiviy problems we got you coverd.
  ami.keepConnected();
  
  // Listen for any/all AMI events.
  ami.on('managerevent', function(evt) {
    console.log(evt.event);
    
  });

  ami.on('extensionstatus' , (event) => {
    console.log('this is an extension status event: ', event);
  });

  ami.on('dial' , function(event){
    console.log('This is a Dial event: ' , event);
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
  placeCall
};