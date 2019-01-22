import React from 'react';
import {connect} from 'react-redux';

import QueueListItem from './QueueListItem';


export class TrunkList extends React.Component {
  constructor(props) {
    super(props);
    this.state ={};
  }

  render() {

    return(
    <div>
      <h1>This is the trunks component</h1>
      <p>{JSON.stringify(this.props.trunks)}</p>
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
  
}
export default connect(mapStateToProps)(TrunkList);