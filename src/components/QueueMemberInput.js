import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {startUpdateQueueInfo} from '../actions/queues'; 

import {Panel} from 'react-bootstrap';


export class QueueMemberInput extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Panel bsStyle='primary'>
          <Panel.Heading>
            <Panel.Title>This is the Queue Member input component</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            Queue
            <input type="text" name="" id="memberQueue"/>
            Endpoint
            <input type="text" name="" id="memberEndpoint"/>
            Name
            <input type="text" name="" id="memberName"/>
            <button onClick={ (e) => {
              console.log('this is running.');
      
              //Rough draft : choose with DOM selector and insert value - Change later to be bound to state.
              //Get required information:
              const queueToAddTo = document.querySelector('input#memberQueue').value;
              const endpointToAdd = document.querySelector('input#memberEndpoint').value;
              const nameToAdd = document.querySelector('input#memberName').value;
                axios.post(`/queue/add` , {
                  queueToAddTo,
                  endpointToAdd,
                  nameToAdd
                })
                  .then((res) => {
                    console.log(res);
                    console.log('Added to the queue');
                    
                  })
                  .catch((err) => {
                    console.log('Error dispatching the axios request to get queue info' , err);
                  });
              }  
            }>Add member to queue</button>
            <button onClick={ (e) => {
              console.log('this is running.');
      
              //Rough draft : choose with DOM selector and insert value - Change later to be bound to state.
              //Get required information:
              const queueToAddTo = document.querySelector('input#memberQueue').value;
              const endpointToAdd = document.querySelector('input#memberEndpoint').value;
              const nameToAdd = document.querySelector('input#memberName').value;
                axios.post(`/queue/remove` , {
                  queueToAddTo,
                  endpointToAdd,
                  nameToAdd
                })
                  .then((res) => {
                    console.log(res);
                    console.log('Removed from the queue');
                    
                  })
                  .catch((err) => {
                    console.log('Error dispatching the axios request to get queue info' , err);
                  });
              }  
            }>Remove member from queue</button>
          </Panel.Body>
        </Panel>
        
      </div>
    );
  };
  
} 

const mapStateToProps = (state) => {
  return {
    myProp: 'hello world!',
    queue: state.queue
  }
};

//connect dispatch action creators to props.
const mapDispatchToProps = {
  startUpdateQueueInfo
}

export default connect(mapStateToProps , mapDispatchToProps)(QueueMemberInput);