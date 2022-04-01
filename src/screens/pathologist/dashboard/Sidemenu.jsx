import React from "react";
import "./Sidemenu.css";
import cube from "../../../assets/images/3d-cube.png";
import friend from "../../../assets/images/add-friend.png";
import pencil from "../../../assets/images/pencil.png";
import chat from "../../../assets/images/chat.png";
import list from "../../../assets/images/list.png";
import logout from "../../../assets/images/logout.png";
import setting from "../../../assets/images/setting.png";
import user from "../../../assets/images/user.png";
import dashboard from "../../../assets/images/dashboard.png";
import { useNavigate } from "react-router-dom";

// const Tooltip = () => {
//   return (
//     <OverlayTrigger
//     placement="right"
//     delay={{ show: 250, hide: 400 }}
//     overlay={renderTooltip}
//   >
//     <Button variant="success">Hover me to see</Button>
//   </OverlayTrigger>
//   )
// }

const Sidemenu = () => {
  const pathName = window.location.pathname
  const navigate = useNavigate()
  return (
    <div className="sidemenu-wrapper vh-100">
      <div className="d-flex justify-content-between vh-100 icon-div">
        <div className="sidemenu-upper-content d-flex justify-content-start">
          <ul className="Navbar-nav menu">
            {/* <li className="sidemenu-li">
              <a href="#" className="active">
                <img src={cube} className="side-icons"></img>
              </a>
            </li> */}
            <li className="sidemenu-li" style={{cursor:'pointer'}} onClick={() => navigate("/pathologst/dashboard")}>
              <a>
                <img src={dashboard} className="side-icons"  style={ pathName ==="/pathologst/dashboard" ? {
                  backgroundColor: "white",
                  padding: "5px",
                  width: "50px",
                }: {}} ></img>
              </a>
            </li>
            <li className="sidemenu-li"  style={{cursor:'pointer'}}  onClick={() => navigate("/pathologst/patients-list")}>
              <a>
                <img src={list} className="side-icons" style={ pathName ==="/pathologst/patients-list" ? {
                  backgroundColor: "white",
                  padding: "5px",
                  width: "50px",
                }: {}} ></img>
              </a>
            </li>
            <li className="sidemenu-li"  style={{cursor:'pointer'}}  onClick={() => navigate("/pathologst/diagnosis-requests")} >
              <a>
                <img src={chat} className="side-icons" style={ pathName ==="/pathologst/diagnosis-requests" ? {
                  backgroundColor: "white",
                  padding: "5px",
                  width: "50px",
                }: {}} ></img>
              </a>
            </li>
            <li className="sidemenu-li"  style={{cursor:'pointer'}}  onClick={() => navigate("/pathologst/classification")} >
              <a>
                <img src={list} className="side-icons" style={ pathName ==="/pathologst/classification" ? {
                  backgroundColor: "white",
                  padding: "5px",
                  width: "50px",
                }: {}} ></img>
              </a>
            </li>
            <li className="sidemenu-li"  style={{cursor:'pointer'}}  onClick={() => navigate("/pathologist/consult-requests")} >
              <a>
                <img src={pencil} className="side-icons" style={ pathName ==="/pathologist/consult-requests" ? {
                  backgroundColor: "white",
                  padding: "5px",
                  width: "50px",
                }: {}} ></img>
              </a>
            </li>
            {/* <li className="sidemenu-li">
              <a href="#">
                <img src={chart} className="side-icons"></img>
              </a>
            </li> */}
            <li className="sidemenu-li"  style={{cursor:'pointer'}}  onClick={() => navigate("/pathologist/profile")} >
              <a>
                <img src={user} className="side-icons" style={ pathName ==="/pathologist/profile" ? {
                  backgroundColor: "white",
                  padding: "5px",
                  width: "50px",
                }: {}} ></img>
              </a>
            </li>
          </ul>
        </div>
        <div className="sidemenu-lower-content d-flex justify-content-end">
          <ul className="Navbar-nav menu">
            <li className="sidemenu-li" onClick={() => {
              window.localStorage.clear()
              navigate("/")
            }}>
              <a href="#">
                <img src={logout} className="side-icons"></img>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidemenu;
