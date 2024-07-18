import React from 'react';
import { useSelector } from 'react-redux';
import Upload from '../Pages/Upload';
import Viewer from './Viewer';

const Dashboard = () => {
  const { currentUser } = useSelector((state) => state.user)
 
  return (
    <>
      {
        currentUser && currentUser.rest.isAdmin ? <Upload /> : <Viewer />
      }
     

    </>
  );
}

export default Dashboard;
