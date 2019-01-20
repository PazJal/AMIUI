import React from 'react';
import {connect} from 'react-redux';


export class QueueList extends React.Component {
  constructor(props) {
    super(props);
    this.state ={};
  }

  render() {
    const queueInfo = this.props.queue.queue ? this.props.queue.queue.queueInfo.queue : undefined;
    const members = this.props.queue.queue ? this.props.queue.queue.members.map((member , index) => (
      <div key={index}>
        <p>
        Name: {member.name},
        Calls Taken: {member.callsTaken}
        </p>  
      </div>
    )) : undefined;
    return(
    <div>
      <h1>{queueInfo}</h1>
      <p>{}</p>
      {members}
    </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    myProp: 'hello world!',
    queue: state.queue
  }
};

//connect dispatch action creators to props.
const mapDispatchToProps = {
  
}
export default connect(mapStateToProps)(QueueList);