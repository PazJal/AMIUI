export default (state = {} , action) => {
  switch(action.type) {
    case 'UPDATE_PEER_INFO':
      return{
        peer: action.peer 
       } ;
    default:
      return state;
  }
};