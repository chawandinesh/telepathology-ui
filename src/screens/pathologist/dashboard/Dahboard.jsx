import React from 'react';
import Main from './Main';
import Sidemenu from './Sidemenu';
import "./Dashboard.css";

const Dashboard = ({children}) => {
  return (
      <div className="dashboard-main">
          <Sidemenu />
          {children}
      </div>
  )
};

export default Dashboard;
