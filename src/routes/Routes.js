import React from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { isLoginSuccess } from "../helpers/helpers";
import LandingPage from "../screens/LandingPage";
import PathologistRecordEntry from "../screens/pathologist/PathologistRecordEntry";
import PatientDashboard from "../screens/patient/dashboard/PatientDashboard";
import PatientDashboardMain from "../screens/patient/dashboard/PatientDashboardMain";
import Login from "../screens/patient/login/Login";
import PatientRecordEntry from "../screens/patient/registration/PatientRecordEntry";
import UploadPathology from "../screens/patient/uploadpathology/UploadPathology";

const AppRoutes = () => {
  const PatientRoute = ({ children }) => {
    if (isLoginSuccess()) {
      return <PatientDashboard>{children}</PatientDashboard>;
    } else {
      return <Navigate to={"/patient/login"} />;
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/patient/dashboard/upload-pathology-sample"
          element={
            <PatientRoute>
              <UploadPathology />
            </PatientRoute>
          }
        />
        <Route
          path="/patient/dashboard"
          element={
            <PatientRoute>
              <PatientDashboardMain />
            </PatientRoute>
          }
        />
        <Route path="/patient/registration" element={<PatientRecordEntry />} />
        <Route path="/pathologist/registration" element={<PathologistRecordEntry />} />
        <Route path="/patient/login" element={isLoginSuccess() ? <Navigate to="/patient/dashboard" /> : <Login />} />
        <Route path="/" element={<Navigate to={isLoginSuccess() ? "/patient/dashboard" : "/patient/login"} />} />
        {/* <Route path="/landing" element={<LandingPage />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
