export const updateTrunkInfo = (trunks) => {
  console.log('Action on Redux regardins trunks');
  return {
    type: 'UPDATE_TRUNK_INFO',
    trunks: trunks
  };
}