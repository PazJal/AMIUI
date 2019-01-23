import React from 'react';
import {connect} from 'react-redux';
import FlipMove from 'react-flip-move';

import io from 'socket.io-client';

import {updateTrunkInfo} from '../actions/trunks';

import TrunkListItem from './TrunkListItem';



export class TrunkList extends React.Component {
  constructor(props) {
    super(props);
    this.state ={};
  }

  componentDidMount(state) {
    const trunks = this.props.trunks;
    const socket = io('http://localhost:3000');
    socket.on('connect' , function () {
      console.log('Connected to server.');
    });
    socket.on('trunkStatusUpdate' , (data) => {
      const trunkToUpdateIndex = trunks.findIndex((trunk) => {
        return trunk.domain === data.domain;
      });
      if (trunkToUpdateIndex === -1) {
        trunks.push(data);
      } else {
        trunks[trunkToUpdateIndex] = data;
      }
      console.log('Trunk Status Update' , data);
      this.props.updateTrunkInfo(trunks);
    });

  }

  render() {
    console.log(this.props.trunks);
    const trunksReadble = this.props.trunks.trunks && this.props.trunks.trunks
    .sort((a , b) => {
      if(a.timestamp > b.timestamp) {
        return -1;
      } else {
        return 1;
      }
    })
    .map((trunk , index) => (
      <TrunkListItem key={trunk.domain} {...trunk} />
    ))
    return(
    <div>
      <h1>This is the trunks component</h1>
      <FlipMove>
        {trunksReadble}
      </FlipMove>
      
    </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    myProp: 'hello world!',
    trunks: state.trunks
  }
};

//connect dispatch action creators to props.
const mapDispatchToProps = {
  updateTrunkInfo
}
export default connect(mapStateToProps , mapDispatchToProps)(TrunkList);