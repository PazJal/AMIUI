import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

import {Panel , ListGroup , ListGroupItem} from 'react-bootstrap';

import QueueListItem from './QueueListItem';





export class QueueList extends React.Component {
  constructor(props) {
    super(props);
    this.state ={};
  }


  getReadableState(status) {
 
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

  render() {
    const queue = this.props.queue ? this.props.queue : undefined;
    const queueInfo = queue.queueInfo ? queue.queueInfo : undefined;
    console.log('queueInfo',queueInfo);
    const members = queue.members ? queue.members.map((member , index) => 
    {
      const {name, callsTaken , paused, status , sinceLastCall} = member;
      const readableTimeSinceLastCall = moment(parseInt(sinceLastCall*1000)).fromNow();
      const readablePaused = paused ? 'Paused' : 'Not Paused';
      const readableStatus = this.getReadableState(status);
      return (
        <ListGroupItem key={index} > 
          <h5>{name}</h5>
          <p>
            {name} has taken {callsTaken} calls. <br/>
            {readablePaused} - {readableStatus} <br/>
            {callsTaken === '0' ? 'Has not taken any calls yet.' : `Last call was ${readableTimeSinceLastCall}` }
          </p>
        </ListGroupItem>
      )  
    }
    ) : undefined;
    return(
    <div>
      <Panel bsStyle='primary'>
        <Panel.Heading>
          <Panel.Title>
            This is the Queue information display panel
          </Panel.Title>
        </Panel.Heading>
        <Panel.Body>
            {queueInfo ? `Now showing ${queueInfo.queue}` : 'Queue not found'}
            <ListGroup>
              {members ? members : 'No information to display'}      
            </ListGroup>
          </Panel.Body>
      </Panel>
    </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    myProp: 'hello world!',
    queue: state.queue
  }
};

//connect dispatch action creators to props.
const mapDispatchToProps = {
  
}
export default connect(mapStateToProps)(QueueList);