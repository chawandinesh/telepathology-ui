import React from 'react';
import Main from './Main';
import Sidemenu from './Sidemenu';
import "./Dashboard.css";

const Dashboard = () => {
  return (
      <div className="dashboard-main">
          <Sidemenu />
          <Main />
      </div>
  )
};

export default Dashboard;
