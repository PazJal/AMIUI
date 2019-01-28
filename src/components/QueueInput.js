import React from 'react';
import Axios from 'axios';
import {connect} from 'react-redux';
import {startUpdateQueueInfo} from '../actions/queues'; 

import {Panel} from 'react-bootstrap';


export class QueueInput extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Panel bsStyle='primary'>
          <Panel.Heading>
            <Panel.Title>This is the Queue input component</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
              Queue
            <input type="text" name="" id="queue"/>
            <button onClick={ (e) => {
              console.log('this is running.');
      
              //Rough draft : choose with DOM selector and insert value - Change later to be bound to state.
              const queueToCheck = document.querySelector('input#queue').value;
              this.props.startUpdateQueueInfo(queueToCheck);
              }  
            }>Get Queue status</button>
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

export default connect(mapStateToProps , mapDispatchToProps)(QueueInput);