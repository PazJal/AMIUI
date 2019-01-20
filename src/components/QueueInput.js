import React from 'react';
import Axios from 'axios';
import {connect} from 'react-redux';
import {startUpdateQueueInfo} from '../actions/queues'; 


export class QueueInput extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        Agent
        <input type="text" name="" id="agent"/>
        <button onClick={ (e) => {
          console.log('this is running.');
  
        //Rough draft : choose with DOM selector and insert value - Change later to be bound to state.
        const agentToLogin = document.querySelector('input#agent').value;

        // Axios.post(`http://localhost:3000/queue/1002`, {
        // })
        // .then(function (response) {
        //   console.log(response);
        // })
        // .catch(function (error) {
        //   console.log(error);
        // });
        this.props.startUpdateQueueInfo(1002);
      }  
      }>Get Queue status</button>
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