const uuid = require('uuid').v4;


const generateAgentLoginObject = (agent , extension , queue) => {
  //Check input validity
  if( Number.parseInt(agent) && Number.parseInt(extension) && Number.parseInt(queue) ) {
    return {
    'action':'queueadd',
    'actionid': uuid(),
    'queue':`${queue}`,
    'interface':`SIP/${extension}`,
    'penalty': 0,
    'paused': false,
    'membername':`Agent/${agent}`
    }
  } else {
    return undefined;
  }
}

const generateAgentLogoutObject = (extension , queue) => {
  //Check input validity
  if( Number.parseInt(extension) && Number.parseInt(queue) ) {
    return {
    'action':'queueremove',
    'actionid': uuid(),
    'queue':`${queue}`,
    'interface':`SIP/${extension}`
    }
  } else {
    return undefined;
  }
}

module.exports = { 
  generateAgentLoginObject,
  generateAgentLogoutObject
}