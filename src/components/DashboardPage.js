import React from 'react';
import io from 'socket.io-client';
import configureStore from '../store/configureStore'

import {updateTrunkInfo} from '../actions/trunks';


const store = configureStore();
const socket = io('http://localhost:3000');
socket.on('connect' , function () {
  console.log('Connected to server.');
});
socket.on('trunkStatusUpdate' , function (data) {
  console.log('Trunk Status Update' , data);
  store.dispatch(updateTrunkInfo(data));
});


import CallInput from '../components/CallInput';
import QueueInput from '../components/QueueInput';
import QueueInfo from '../components/QueueInfo';
import QueueList from '../components/QueueList';
import PeerList from '../components/PeerList';
import PeerInput from '../components/PeerInput';
import TrunkList from '../components/TrunkList';

const DashboardPage = () => (
  <div className="content-container content-container--spaced"> 
    This is the dashboard component:
    <TrunkList />
    <CallInput />
    <QueueInput /> 
    {/* <QueueInfo /> */}
    <QueueList />
    <PeerInput />
    <PeerList />

  </div>
);

export default DashboardPage;