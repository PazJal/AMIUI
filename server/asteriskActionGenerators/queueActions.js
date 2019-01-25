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
  if( Number.parseInt(agent) && Number.parseInt(extension) && Number.parseInt(queue) ) {
    return {
    'action':'queueadd',
    'actionid': uuid,
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

const generateAgentLogoutObject = (uuid, extension , queue) => {
  //Check input validity
  if( Number.parseInt(extension) && Number.parseInt(queue) ) {
    return {
    'action':'queueremove',
    'actionid': uuid,
    'queue':`${queue}`,
    'interface':`SIP/${extension}`
    }
  } else {
    return undefined;
  }
}

module.exports = { 
  generateAgentLoginObject,
  generateAgentLogoutObject,
  generateQueueStatusObject
}