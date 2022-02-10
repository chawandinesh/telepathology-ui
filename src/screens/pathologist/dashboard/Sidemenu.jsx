import React from "react";
import "./Sidemenu.css";
import cube from "../../../assets/images/3d-cube.png";
import friend from "../../../assets/images/add-friend.png";
import chart from "../../../assets/images/bar-chart.png";
import chat from "../../../assets/images/chat.png";
import list from "../../../assets/images/list.png";
import logout from "../../../assets/images/logout.png";
import setting from "../../../assets/images/setting.png";
import user from "../../../assets/images/user.png";
import dashboard from "../../../assets/images/dashboard.png";



const Sidemenu = () => {
  return (
    <div className="sidemenu-wrapper">
      <div className="d-flex justify-content-end icon-div">
        <div className="sidemenu-upper-content d-flex justify-content-start">
          <ul className="Navbar-nav menu">
            <li className="sidemenu-li">
              <a href="#" className="active">
                <img src={cube} className="side-icons"></img>
              </a>
            </li>
            <li className="sidemenu-li">
              <a href="#">
                <img src={dashboard} className="side-icons"></img>
              </a>
            </li>
            <li className="sidemenu-li">
              <a href="#">
                <img src={list} className="side-icons"></img>
              </a>
            </li>
            <li className="sidemenu-li">
              <a href="#">
                <img src={chat} className="side-icons"></img>
              </a>
            </li>
            <li className="sidemenu-li">
              <a href="#">
                <img src={chart} className="side-icons"></img>
              </a>
            </li>
            <li className="sidemenu-li">
              <a href="#">
                <img src={setting} className="side-icons"></img>
              </a>
            </li>
          </ul>
        </div>
        <div className="sidemenu-lower-content d-flex justify-content-end">
          <ul className="Navbar-nav menu">
            <li className="sidemenu-li">
              <a href="#">
                <img src={user} className="side-icons"></img>
              </a>
            </li>
            <li className="sidemenu-li">
              <a href="#">
                <img src={friend} className="side-icons"></img>
              </a>
            </li>
            <li className="sidemenu-li">
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
