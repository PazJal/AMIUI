import React from 'react';
import moment from 'moment';

const getReadableState = function(status) {
 
  const statusCode =Number.parseInt(status);
  console.log('Called with ' ,statusCode);

  let statusText = '';
  const idleFlag = 0;
  const inUseFlag = 1;
  const busyFlag = 2;
  const unavialableFlag = 4;
  const ringingFlag = 8;
  const onHoldFlag = 16;
  const notFoundFlag = -1;

  if (statusCode & idleFlag){
    statusText = statusText.concat(' IDLE');
  }
  if (statusCode & inUseFlag){
    console.log('In Use');
    statusText = statusText.concat(' IN USE');
  }
  if (statusCode & unavialableFlag){
    statusText = statusText.concat(' UNAVAILABLE');
  }
  if (statusCode & busyFlag){
    statusText = statusText.concat(' BUSY');
  }
  if (statusCode & ringingFlag){
    statusText = statusText.concat(' RINGING');
  }
  if (statusCode & onHoldFlag){
    statusText = statusText.concat(' ONHOLD');
  }
  if (statusCode === -1){
    statusText = 'NOTFOUND';
  }

  console.log(statusText);
  return statusText;
}

export class QueueListItem extends React.Component{
  constructor(props){
    super(props);
  }


  render() {
      const {name, callsTaken , paused, status , sinceLastCall} = this.props;
      const readableTimeSinceLastCall = moment(parseInt(sinceLastCall*1000)).fromNow();
      const readablePaused = paused ? 'Paused' : 'Not Paused';
      const readableStatus = getReadableState(status);
    return (
      <div>
        
        <button>Remove from Queue Button</button>
      </div>
    );
  }
}

export default QueueListItem;