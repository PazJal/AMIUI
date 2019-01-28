export default (state = {} , action) => {
  switch(action.type) {
    case 'UPDATE_QUEUE_INFO':
      return {
        ...action.queue
      };
    default:
      return state;
  }
};