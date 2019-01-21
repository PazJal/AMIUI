import axios from 'axios';

export const startUpdatePeerInfo = (peer = undefined) => {
  return (dispatch) => {

    //TODO: add input check.
    axios.post(`/peers` , {
      peer
    })
      .then((res) => {
        console.log(res);
        console.log('Peer Reducer about to run.');
        dispatch(updatePeerInfo(res.data));
      })
      .catch((err) => {
        console.log('Error dispatching the axios request to get peer info' , err);
      });
  }
}

export const updatePeerInfo = (peer) => {
  return {
    type: 'UPDATE_PEER_INFO',
    peer
  };
}