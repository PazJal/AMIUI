import React from 'react';


import CallInput from '../components/CallInput';
import QueueInput from '../components/QueueInput';
import QueueInfo from '../components/QueueInfo';
import QueueList from '../components/QueueList';

const DashboardPage = () => (
  <div> 
    Dashboard page content. !
    <CallInput />
    <QueueInput /> 
    <QueueInfo />
    <QueueList />
  </div>
);

export default DashboardPage;