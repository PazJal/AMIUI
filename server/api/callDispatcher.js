const {amiPort , amiServer , amiUser , amiPassword} = require('../conf/asterisk-conf');
const {generateOriginateCallAction} = require('../asteriskActionGenerators/callActions');
    
const placeCall = (number , extension) => {
  var ami = new require('asterisk-manager')(amiPort, amiServer, amiUser, amiPassword, true);
  // In case of any connectiviy problems we got you coverd.
  ami.keepConnected();
  // Listen for any/all AMI events.
  ami.on('managerevent', function(evt) {
    console.log(evt.event);
  });

  //Handle information needed to orginiate a call - note that the extension assumes SIP as interface.
  const numToCall = Number.parseInt(number) ? number : 101;
  const extensionString = `SIP/${extension}`;

  //Generate action object and pass it to ami api. 
  ami.action(generateOriginateCallAction(extensionString , undefined, numToCall), function(err, res) {
    if(err) {
      //Print an error that will indicate what went wrong for the programmer.
      console.log(`Error - Unable to originate call from ${extensionString} to ${numToCall} -- placeCall()` , err);
    }
  });
}

//Module exports:
module.exports = {
  placeCall
};