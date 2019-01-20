export default (state = {} , action) => {
  switch(action.type) {
    case 'UPDATE_QUEUE_INFO':
      return{
        queue: action.queue 
       } ;
    default:
      return state;
  }
};