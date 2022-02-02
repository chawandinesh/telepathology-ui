import React from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import PatientDashboard from "../screens/patient/PatientDashboard";
import PatientRecordEntry from "../screens/patient/PatientRecordEntry";
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/patient/dashboard" element={<PatientDashboard/>} />
        <Route path="/patient/registration" element={<PatientRecordEntry/>} />
        <Route path="/" element={<Navigate to={"/patient/registration"} />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
