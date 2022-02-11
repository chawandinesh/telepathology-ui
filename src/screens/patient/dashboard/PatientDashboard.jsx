import React, { useState, useEffect } from "react";
import _ from "lodash";
import "./patientdashboard.css";
import { MdOutlineSpaceDashboard, MdOutlineRecommend, MdOutlineAppRegistration } from "react-icons/md";
import { FaWpforms, FaLaptopMedical, FaSignOutAlt, FaUser } from "react-icons/fa";
import { BsFileSpreadsheet } from "react-icons/bs";
import { useNavigate, useLocation } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import {  getPatientById, baseUrl, updatePatient } from "../../../helpers/helpers";
import ToastComponent from "../../../components/ToastComponent";

const profileImageRef = React.createRef();
const PatientDashboard = ({ navigation, children }) => {
  // const [pathologySample, setPathologySample] = useState(second);
  
  const [state, setState] = useState({
    show: false,
    message:"",
    type: "success"
  });
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const getUserData = () => {
    const userId = JSON.parse(localStorage.getItem("user"))
    getPatientById(_.get(userId,"_id")).then(res => {
      setUser(_.get(res,"data.data",""));
    }).catch((err) => {
      console.log(err);
    })
  }


  const getProifleImage = () => {
    if (user?.image) {
      return `${baseUrl}/${user.image}`;
    } else {
      return "https://w7.pngwing.com/pngs/340/956/png-transparent-profile-user-icon-computer-icons-user-profile-head-ico-miscellaneous-black-desktop-wallpaper.png";
    }
  };

 
  const SideBarMenuItems = () => (
    <div className="middle">
      <div className="list__container">
        <ul>
          {_.map(
            [
              { name: "Dashboard", selected: false, icon: <MdOutlineSpaceDashboard />, path: "/patient/dashboard" },
              {
                name: "Pathology Samples",
                selected: true,
                icon: <FaWpforms />,
                path: "/patient/dashboard/pathology-sample",
              },
              {
                name: "Diagnosis and Comments",
                selected: true,
                icon: <FaWpforms />,
                path: "/patient/dashboard/diagnosiscomments",
              },
              {
                name: "Profile",
                selected: true,
                icon: <FaUser />,
                path: "/patient/profile",
              },
              // {
              //   name: "View results and report",
              //   selected: false,
              //   icon: <BsFileSpreadsheet />,
              //   path: "/patient/dashboard/results-reports",  
              // },
              // {
              //   name: "Recommendations",
              //   selected: false,
              //   icon: <MdOutlineRecommend />,
              // },
              // {
              //   name: "Treatment plan",
              //   selected: false,
              //   icon: <FaLaptopMedical />,
              // },
              // {
              //   name: "Appointment",
              //   selected: false,
              //   icon: <MdOutlineAppRegistration />,
              // },
            ],
            (each, idx) => (
              <li key={idx}>
                <div
                  className={`list__name__container ${location.pathname === each.path ? "selected" : ""}`}
                  onClick={() => {
                    if (each.path) {
                      navigate(each.path);
                    }
                  }}
                >
                  <div className="list__icon">{each.icon}</div>
                  <div className="list__name">{each.name}</div>
                </div>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );

  const handleLogout = () => {
    window.localStorage.clear();
    setTimeout(() => {
      window.location.reload();
    }, 200);
  };

  const ProfileImage = new FormData();

  const handleImageUpload = (e) => {
    ProfileImage.append("image", e.target.files[0]);
    ProfileImage.append("data", JSON.stringify({ _id: _.get(user, "_id"), oldimage: _.get(user,"image") }));
    updatePatient(ProfileImage)
      .then((res) => {
        console.log(res, "res...");
        setState({
          ...state,
          show: true,
          message:"Successfully updated",
          type: "success"
        })
        getUserData()
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
     getUserData()
  }, []);
  

  return (
    <div className="patient__dashboard">
      <div className="patient__dashboard__sidebar">
        <div className="telepathology__container">
          <h3>TelePathology</h3>
        </div>
        <hr />
        <div className="top">
          <div className="profile__container">
            <div className="profile__image__container">
              <img
                src={getProifleImage()}
                alt="alex"
                height="100%"
                width="100%"
                style={{ borderRadius: "50%", objectFit: "cover" }}
              />
              <div className="faediticon__container" onClick={() => profileImageRef.current.click()}>
                <FaEdit className="faediticon" />
              </div>
            </div>
            <div className="profile__name">
              <h5>{`${_.get(user, "firstName","")} ${_.get(user, "lastName","")}`}</h5>
              <span>{_.get(user, "ABHAHealthId", "")}</span>
            </div>
          </div>
        </div>
        {SideBarMenuItems()}
        <hr />
        <div className="bottom">
          <div className="info__container">
            <div>
              <FaSignOutAlt />
            </div>
            <div className="logout__name" onClick={handleLogout}>
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>
      <div className="patient__dashboard__main">{children}</div>
      {/* <ToastContainer position="top-end" className="p-3">
        <Toast onClose={() => setSuccess(false)} bg="success" show={success} delay={3000} autohide>
          <Toast.Header>
            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
            <strong className="me-auto">Success</strong>
            <small className="text-muted">just now</small>
          </Toast.Header>
          <Toast.Body style={{ color: "#fff" }}>Successfully uploaded</Toast.Body>
        </Toast>
      </ToastContainer>
      <ToastContainer position="top-end" className="p-3">
        <Toast onClose={() => setError(false)} bg="danger" show={error} delay={3000} autohide>
          <Toast.Header>
            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
            <strong className="me-auto">Failed</strong>
            <small className="text-muted">just now</small>
          </Toast.Header>
          <Toast.Body style={{ color: "#fff" }}>Failed to upload</Toast.Body>
        </Toast>
      </ToastContainer> */}
      <ToastComponent state={state} setState={setState}/>
      <input type="file" accept="image/*" className="d-none" onChange={handleImageUpload} ref={profileImageRef} />
    </div>
  );
};

export default PatientDashboard;
