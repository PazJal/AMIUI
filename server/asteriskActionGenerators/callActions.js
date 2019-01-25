

const generateOriginateCallAction = (extension , context , numToCall) => {
  return {
    'action':'originate',
    'channel':extension,
    'context':'from-internal', //Add variable context flexibility.
    'exten': numToCall,
    'priority':1,
    'variable':{
      'name1':'value1',
      'name2':'value2'
    }
  };
}

module.exports = {
  generateOriginateCallAction
}