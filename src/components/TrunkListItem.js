import React from 'react';
import moment from 'moment';

export class TrunkListItem extends React.Component{
  constructor(props){
    super(props);
  }


  render() {
    const {domain , timestamp} = this.props;
      
    return (
      <div className="experimental_item">
        <h5>{domain}</h5>
        <p>
          Last registed at: {moment(timestamp).format('DD-MM-YYYY HH:mm:ss ZZ')}
        </p>
      </div>
    );
  }
}

export default TrunkListItem;