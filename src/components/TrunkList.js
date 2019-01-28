import React from 'react';
import {connect} from 'react-redux';
import FlipMove from 'react-flip-move';
import {ListGroup , ListGroupItem, Panel} from 'react-bootstrap';
import moment from 'moment';

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
    console.log('Current Trunk State: ',this.props.trunks);
    const trunks = this.props.trunks.trunks ? this.props.trunks.trunks : [];
    const trunksReadble = trunks.length === 0 ? 
      <ListGroupItem key='0'>Waiting for trunks to register. </ListGroupItem> :
      trunks
    .sort((a , b) => {
      if(a.timestamp > b.timestamp) {
        return -1;
      } else {
        return 1;
      }
    })
    .map((trunk , index) => (
      <ListGroupItem key={trunk.domain}>
        <h3>{trunk.domain}</h3>
        <p>
          Last registed at: {moment(trunk.timestamp).format('DD-MM-YYYY HH:mm:ss ZZ')}
        </p>
      </ListGroupItem>
      // <TrunkListItem key={trunk.domain} {...trunk} />
    ))
    return(
    <div>
      <Panel bsStyle='primary'>
        <Panel.Heading>
          <Panel.Title componentClass="h3">This is the trunks component</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
        <ListGroup>
        <FlipMove>
          {trunksReadble}
        </FlipMove>
      </ListGroup>
        </Panel.Body>

      </Panel>


      {/* <h1>This is the trunks component</h1>
      <ListGroup>
        <FlipMove>
          {trunksReadble}
        </FlipMove>
      </ListGroup> */}
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