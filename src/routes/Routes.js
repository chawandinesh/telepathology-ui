import React from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { isLoginSuccess } from "../helpers/helpers";
import LandingPage from "../screens/landing/LandingPage";
import LandingSignin from "../screens/landing/LandingSignin";
import LandingSignup from "../screens/landing/LandingSignuup";
import PathologistDashboardMain from "../screens/pathologist/dashboard/PathologistDashboardMain";
import PathologistRecordEntry from "../screens/pathologist/PathologistRecordEntry";
import PatientDashboard from "../screens/patient/dashboard/PatientDashboard";
import PatientDashboardMain from "../screens/patient/dashboard/PatientDashboardMain";
import DiagnosisAndComments from "../screens/patient/diagnosisandcomments/DiagnosisAndComments";
import PatientLogin from '../screens/patient/login/Login'
import PathologistLogin from '../screens/pathologist/login/Login'
import PatientRecordEntry from "../screens/patient/registration/PatientRecordEntry";
import ResultsReports from "../screens/patient/results-reports/ResultsReports";
import PathologySamples from "../screens/patient/uploadpathology/PathologySamples";
import UploadPathology from "../screens/patient/uploadpathology/UploadPathology";

const AppRoutes = () => {
  const PatientRoute = ({ children }) => {
    if (isLoginSuccess()) {
      return <PatientDashboard>{children}</PatientDashboard>;
    } else {
      return <Navigate to={"/patient/login"} />;
    }
  };

  const PathologistRoute = ({ children }) => {
    if (isLoginSuccess()) {
      return <PatientDashboard>{children}</PatientDashboard>;
    } else {
      return <Navigate to={"/pathologist/login"} />;
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/patient/dashboard/pathology-sample"
          element={
            <PatientRoute>
              <PathologySamples />
            </PatientRoute>
          }
        />
        <Route
          path="/patient/dashboard/diagnosiscomments"
          element={
            <PatientRoute>
              <DiagnosisAndComments />
            </PatientRoute>
          }
        />

        <Route
            path="/patient/dashboard/results-reports"
            element={
              <PatientRoute>
                <ResultsReports />
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
         <Route
          path="/pathologist/dashboard"
          element={
            <PathologistRoute>
              <PathologistDashboardMain />
            </PathologistRoute>
          }
        />
        <Route path="/patient/registration" element={<PatientRecordEntry />} />
        <Route path="/pathologist/registration" element={<PathologistRecordEntry />} />
        <Route path="/pathologist/login" element={isLoginSuccess() ? <Navigate to="/patient/dashboard" /> : <PathologistLogin />} />
        <Route path="/patient/login" element={isLoginSuccess() ? <Navigate to="/patient/dashboard" /> : <PatientLogin />} />
        <Route path="/" element={<Navigate to={isLoginSuccess() ? "/patient/dashboard" : "/patient/login"} />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/landing/signin" element={<LandingSignin />} />
        <Route path="/landing/signup" element={<LandingSignup />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
