import axios from 'axios';

export const startUpdateQueueInfo = (queue = undefined) => {
  return (dispatch) => {

    //TODO: add input check.
    axios.post('/queue/1002' , {})
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