

// export const startUpdateTrunkInfo = (queue = undefined) => {
//   return (dispatch) => {

//     // //TODO: add input check.
//     // axios.post(`/queue/${queue}` , {})
//     //   .then((res) => {
//     //     console.log(res);
//     //     console.log('Reducer about to run.');
//     //     dispatch(updateQueueInfo(res.data));
//     //   })
//     //   .catch((err) => {
//     //     console.log('Error dispatching the axios request to get queue info' , err);
//     //   });
//   }
// }

export const updateTrunkInfo = (trunk) => {
  console.log('Action on Redux regardins trunks');
  return {
    type: 'UPDATE_TRUNK_INFO',
    trunks: trunk
  };
}

// You will have to write code that communicates updates from server to the clients. The best way to do this would be use websockets. You can use frameworks like http://socket.io/ etc.
// The Express samples that you have come across that use createStore on the server side are for server side rendering. Accessing store here to push stock updates is not preferred.
// In Brief, what you need to do is ,

// Set up socket io or websocket server
// On the client, set up a socket-io client. It waits for messages from server.
// Whenever you get stock updates, send the data from server to client through socket io.
// When the client receives the message, dispatch an action with the data and let redux flow handle the state/store.