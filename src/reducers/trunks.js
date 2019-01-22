export default (state = [] , action) => {
  console.log('Trunk Reducer is working' , action.trunks);
  switch(action.type) {
    case 'UPDATE_TRUNK_INFO':
      return {
        trunks: action.trunks
       };
    default:
      return state;
  }
};