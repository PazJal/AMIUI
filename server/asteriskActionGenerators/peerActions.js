//Each AMI-Action generator should receive a uuid as its first argument.

const generateSipPeerStatusObject = (actionid , peer) => {
  return {
    'action': 'sippeerstatus',
    actionid,
    peer 
  }
};

module.exports = {
  generateSipPeerStatusObject
};
