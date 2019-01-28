import React from 'react';
import {connect} from 'react-redux';

import PeerListItem from './PeerListItem';

import {Panel} from 'react-bootstrap';


export class PeerList extends React.Component {
  constructor(props) {
    super(props);
    this.state ={};
  }

  render() {
    return(
    <div>
      <Panel bsStyle='primary'>
        <Panel.Heading>
          <Panel.Title>
            This is the Peer List Component
          </Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          {this.props.peer.peer ? <PeerListItem {...this.props.peer.peer.peerInfo}/> : 'There are no peers to show at the moment.' }
        </Panel.Body>
      </Panel>
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