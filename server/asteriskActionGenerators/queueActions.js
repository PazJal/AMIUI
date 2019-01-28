//Each action generator first argument should be a uuid - 
//This will allow a tracking of different actions.

const generateQueueStatusObject = (uuid , queue) => {
  return {
    'action': 'queuestatus',
    actionid: uuid,
    'queue': queue
  }
}


const generateAgentLoginObject = (uuid , agent , extension , queue) => {
  //Check input validity
    return {
    'action':'queueadd',
    'actionid': uuid,
    'queue':`${queue}`,
    'interface':`${extension}`,
    'penalty': 0,
    'paused': false,
    'membername':`${agent}`
    };
}

const generateAgentLogoutObject = (uuid, extension , queue) => {
  //Check input validity
    return {
    'action':'queueremove',
    'actionid': uuid,
    'queue':`${queue}`,
    'interface':`${extension}`
    };
}

module.exports = { 
  generateAgentLoginObject,
  generateAgentLogoutObject,
  generateQueueStatusObject
}