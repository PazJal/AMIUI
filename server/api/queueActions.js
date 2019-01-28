const uuid = require('uuid').v4;


const generateAgentLoginObject = (queue , extension , agent) => {
  //Check input validity
    return {
    'action':'queueadd',
    'actionid': uuid(),
    'queue':`${queue}`,
    'interface':`${extension}`,
    'penalty': 0,
    'paused': false,
    'membername':`${agent}`
    };
}

const generateAgentLogoutObject = (queue , extension) => {
  
  //Check input validity
    return {
    'action':'queueremove',
    'actionid': uuid(),
    'queue':`${queue}`,
    'interface':`${extension}`
    };
}

module.exports = { 
  generateAgentLoginObject,
  generateAgentLogoutObject
}