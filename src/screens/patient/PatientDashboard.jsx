import React, { useState } from "react";
import _ from "lodash";
import "./dashboard_patient.css";
import { MdOutlineSpaceDashboard, MdOutlineRecommend, MdOutlineAppRegistration } from "react-icons/md";
import { FaWpforms, FaLaptopMedical, FaSignOutAlt} from "react-icons/fa";
import { BsFileSpreadsheet } from "react-icons/bs";
import alexImg from "../../assets/images/alex.jpeg";

const PatientDashboard = () => {
  const [selectedName, setSelectedName] = useState("Dashboard");

  const SideBarMenuItems = () => (
    <div className="middle">
      <div className="list__container">
        <ul>
          {_.map(
            [
              { name: "Dashboard", selected: false, icon: <MdOutlineSpaceDashboard /> },
              { name: "Upload pathology sample", selected: true, icon: <FaWpforms /> },
              {
                name: "View results and report",
                selected: false,
                icon: <BsFileSpreadsheet />,
              },
              {
                name: "Recommendations",
                selected: false,
                icon: <MdOutlineRecommend />,
              },
              {
                name: "Treatment plan",
                selected: false,
                icon: <FaLaptopMedical />,
              },
              {
                name: "Appointment",
                selected: false,
                icon: <MdOutlineAppRegistration />,
              },
            ],
            (each, idx) => (
              <li key={idx}>
                <div
                  className={`list__name__container ${each.name === selectedName ? "selected" : ""}`}
                  onClick={() => setSelectedName(each.name)}
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

  return (
    <div className="patient__dashboard">
      <div className="patient__dashboard__sidebar">
        <div className="telepathology__container">
          <h3>TelePahology</h3>
          <p>Sample text</p>
        </div>
        <hr />
        <div className="top">
          <div className="profile__container">
            <div className="profile__image__container">
              <img
                src={alexImg}
                alt="alex"
                height="100%"
                width="100%"
                style={{ borderRadius: "50%", objectFit: "cover" }}
              />
            </div>
            <div className="profile__name">
              <h5>Alex</h5>
              <span>Software engineer</span>
            </div>
          </div>
        </div>
        {SideBarMenuItems()}
        <hr />
        <div className="bottom">
          <div className="info__container">
            <div>
              <FaSignOutAlt/>
            </div>
            <div className="logout__name">
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>
      <div className="patient__dashboard__main"></div>
    </div>
  );
};

export default PatientDashboard;
