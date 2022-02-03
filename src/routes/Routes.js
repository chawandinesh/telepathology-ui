import React from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import PathologistRecordEntry from "../screens/pathologist/PathologistRecordEntry";
import PatientDashboard from "../screens/patient/dashboard/PatientDashboard";
import PatientDashboardMain from "../screens/patient/dashboard/PatientDashboardMain";
import Login from "../screens/patient/login/Login";
import PatientRecordEntry from "../screens/patient/registration/PatientRecordEntry";
import UploadPathology from "../screens/patient/uploadpathology/UploadPathology";
const AppRoutes = () => {

  const PatientRoute = ({children}) => {
    return (
      <PatientDashboard>
       {children}
      </PatientDashboard>
    )
  }
  return (
    <Router>
      <Routes>
        <Route path="/patient/dashboard/upload-pathology-sample" element={<PatientRoute><UploadPathology/></PatientRoute>} />
        <Route path="/patient/dashboard" element={<PatientRoute><PatientDashboardMain/></PatientRoute>} />
        <Route path="/patient/registration" element={<PatientRecordEntry/>} />
        <Route path="/pathologist/registration" element={<PathologistRecordEntry/>}/>
        <Route path="/patient/login" element={<Login/>}/>
        <Route path="/" element={<Navigate to={"/patient/login"} />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
