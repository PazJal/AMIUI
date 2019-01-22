import React from 'react';



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