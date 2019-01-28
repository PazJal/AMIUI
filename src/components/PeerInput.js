import React from 'react';
import Axios from 'axios';
import {connect} from 'react-redux';
import {startUpdatePeerInfo} from '../actions/peers'; 

import {Panel} from 'react-bootstrap';




export class PeerInput extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Panel bsStyle='primary'>
          <Panel.Heading>
            <Panel.Title>
              This is the Peer Input component.
            </Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            Peer
            <input type="text" name="" id="peer"/>
            <button onClick={ (e) => {
              console.log('this is running.');
        
                //Rough draft : choose with DOM selector and insert value - Change later to be bound to state.
                const peerToCheck = document.querySelector('input#peer').value;
                this.props.startUpdatePeerInfo(peerToCheck);
              }  
            }>Get Peer status</button>
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
  startUpdatePeerInfo
}

export default connect(mapStateToProps , mapDispatchToProps)(PeerInput);