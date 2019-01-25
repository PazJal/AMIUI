const {amiPort , amiServer , amiUser , amiPassword} = require('../conf/asterisk-conf');
const {generateOriginateCallAction} = require('../asteriskActionGenerators/callActions');
    
const placeCall = (number , extension) => {
  var ami = new require('asterisk-manager')(amiPort, amiServer, amiUser, amiPassword, true);
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

  ami.action(generateOriginateCallAction(extensionString , undefined, numToCall), function(err, res) {
    if(err) {
      console.log('An error has occured! ' , err);
    }
  });
}


module.exports = {
  placeCall
};