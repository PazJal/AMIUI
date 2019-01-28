import axios from 'axios';

export const startUpdateQueueInfo = (queue = undefined) => {
  return (dispatch) => {

    //TODO: add input check.
    axios.post(`/queue/${queue}` , {})
      .then((res) => {
        console.log(res);
        console.log('Reducer about to run.');
        dispatch(updateQueueInfo(res.data));
      })
      .catch((err) => {
        console.log('Error dispatching the axios request to get queue info' , err);
      });
  }
}

export const updateQueueInfo = (queue) => {
  return {
    type: 'UPDATE_QUEUE_INFO',
    queue: queue
  };
}

// export const startAddQueueMember = (queue = undefined) => {
//   return (dispatch) => {

//     //TODO: add input check.
//     axios.post(`/queue/${queue}` , {})
//       .then((res) => {
//         console.log(res);
//         console.log('Reducer about to run.');
//         dispatch(updateQueueInfo(res.data));
//       })
//       .catch((err) => {
//         console.log('Error dispatching the axios request to get queue info' , err);
//       });
//   }
// }
// export const addQueueMember = (queue) => {
//   return {
//     type: 'ADD_QUEUE_MEMBER',
//     queue: queue
//   };
// }
