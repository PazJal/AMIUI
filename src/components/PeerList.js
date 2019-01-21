import React from 'react';
import {connect} from 'react-redux';

import PeerListItem from './PeerListItem';


export class PeerList extends React.Component {
  constructor(props) {
    super(props);
    this.state ={};
  }

  render() {
    // const queueInfo = this.props.queue.queue ? this.props.queue.queue.queueInfo.queue : undefined;
    // const members = this.props.queue.queue ? this.props.queue.queue.members.map((member , index) => (
    //   <QueueListItem key={index} {...member} />
    // )) : undefined;
    return(
    <div>
      <h1>Peer List</h1>
        {this.props.peer.peer ? <PeerListItem {...this.props.peer.peer.peerInfo}/> : 'There are no peers to show at the moment.' }
    </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    myProp: 'hello peer',
    peer: state.peer
  }
};

//connect dispatch action creators to props.
const mapDispatchToProps = {
  
}
export default connect(mapStateToProps)(PeerList);