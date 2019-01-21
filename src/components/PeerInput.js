import React from 'react';
import Axios from 'axios';
import {connect} from 'react-redux';
import {startUpdatePeerInfo} from '../actions/peers'; 


export class PeerInput extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="content-container content-container--spaced">
        Peer
        <input type="text" name="" id="peer"/>
        <button onClick={ (e) => {
          console.log('this is running.');
  
        //Rough draft : choose with DOM selector and insert value - Change later to be bound to state.
        const peerToCheck = document.querySelector('input#peer').value;

        // Axios.post(`http://localhost:3000/queue/1002`, {
        // })
        // .then(function (response) {
        //   console.log(response);
        // })
        // .catch(function (error) {
        //   console.log(error);
        // });
        this.props.startUpdatePeerInfo(peerToCheck);
      }  
      }>Get Peer status</button>
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
  startUpdatePeerInfo
}

export default connect(mapStateToProps , mapDispatchToProps)(PeerInput);