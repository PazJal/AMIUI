export default (state = {} , action) => {
  console.log('Reducer is working');
  switch(action.type) {
    case 'UPDATE_TRUNK_INFO':
      return{
        trunks: action.trunk 
       } ;
    default:
      return state;
  }
};