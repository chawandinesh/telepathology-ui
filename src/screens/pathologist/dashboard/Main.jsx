import React from "react";
import "./Main.css";
import calendar from "../../../assets/images/calendar.png";
import ellipsis from "../../../assets/images/ellipsis.png";
import arrow from "../../../assets/images/right-arrow.png";
import pencil from "../../../assets/images/pencil.png";
import search from "../../../assets/images/search.png";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  PieChart,
  Pie,
} from "recharts";

const Main = () => {
  // Donut chart

  // analytics chart
  const data = [
    { name: "Mon", uv: 400, pv: 2400, amt: 2400 },
    { name: "tue", uv: 300, pv: 2400, amt: 2400 },
    { name: "Wed", uv: 350, pv: 2400, amt: 2400 },
    { name: "Thu", uv: 380, pv: 2400, amt: 2400 },
  ];

  const renderLineChart = (
    <LineChart
      width={600}
      height={200}
      data={data}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
    >
      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="name" />
      <YAxis />
    </LineChart>
  );

  return (
    <div className="main-wrapper">
      {/* header search */}
      <header>
        <div className="container-fluid">
          <div class="header-wrapper">
            <div class="header-input">
              <div class="input-group col-md-6 mt-4">
                <input
                  class="form-control py-3"
                  type="search"
                  placeholder="search"
                  id="example-search-input"
                />
                <span class="input-group-append">
                  <button
                    className="btn btn-outline-secondary border-left-0 border search-button"
                    type="button"
                  >
                  <img src={search} alt="search" className="search-icon" />
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* main content */}
      <div className="container-fluid">
        <div class="main-content ">
          {/* main content top */}

          <div class="main-content-top d-flex justify-content-between text-white my-4">
            <h1 className="ml-3 heading">Dashboard</h1>
            <h4 className="">
              <img className="main-icons" src={calendar} alt="calender" />
              wed 24.02.2021
            </h4>
          </div>
          {/* main content mid */}
          <div class="main_content_mid d-flex justify-content-between">
            <div class="card pt-3">
              <div className="donut-chart">
                <PieChart width={730} height={140}>
                  <Pie
                    data={[
                      {
                        name: "Group A",
                        value: 400,
                        fill:"#45afa0",
                       
                      },
                      {
                        name: "Group B",
                        value: 300,
                        fill:"#6fcd9d"
                      },
                    ]}
                    dataKey="value"
                    nameKey="name"
                    cx="15%"
                    cy="50%"
                    outerRadius={50}
                    fill="#8884d8"
                  />
                </PieChart>
              </div>
              <div className="chart-details text-center pt-0 pb-0 m-0">
                <p className="mb-1 space-detail"><span className="color-indicator"></span>Men-60%</p>
                <p className="mt-0"><span className="color-indicator-2"/>Women-40%</p>
              </div>
            </div>
            <div className="patients-box d-flex">
              <div className=" patients-details mb-4">
                <h5>New patients</h5>
                <div className="patients-number d-flex justify-content-between align-items-center">
                  <div>
                    <h2>54</h2>
                  </div>
                  <div>
                    <span className="percentage">^ 51%</span>
                  </div>
                </div>
              </div>
              <div className=" patients-details">
                <h5>Old patients</h5>
                <div className="patients-number d-flex justify-content-between align-items-center">
                  <div>
                    <h2>32</h2>
                  </div>
                  <div>
                    <span className="percentage bg-red">^ 02%</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="analytics-box">
              <h3 class="">Analytics</h3>
              {renderLineChart}
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid mt-3">
        <div className="row mb-5">
          <div className="col-6">
            <h3 className=" ml-3 heading mb-3">Events</h3>
            <div className="events-wrapper d-flex justify-content-between ml-3">
              <div className="team-meeting">
                <h5>Team Meating</h5>
                <span>13:30-14:40</span>
              </div>
              <div className="icons-button">
                <div class="form-check form-switch  mb-2">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="flexSwitchCheckDefault"
                  />
                </div>
                <div className="arrow-edit-icons mt-3">
                  <img src={pencil} alt="edit" className="common-icons" />
                  <img src={arrow} alt="arrow" className="common-icons" />
                </div>
              </div>
            </div>
            <div className="events-wrapper d-flex justify-content-between ml-3 mt-4">
              <div className="team-meeting">
                <h5>Team Meating</h5>
                <span>13:30-14:40</span>
              </div>
              <div className="icons-button">
                <div class="form-check form-switch  mb-2">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="flexSwitchCheckDefault"
                  />
                </div>
                <div className="arrow-edit-icons mt-3">
                  <img src={pencil} alt="edit" className="common-icons" />
                  <img src={arrow} alt="arrow" className="common-icons" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-6">
            <h3 className="ml-3 heading mb-3">Your patients today</h3>
            <div className="events-wrapper">
              <div className=" d-flex  justify-content-between align-items-center">
                <div className="patients-timing">
                  <p>10:00 am</p>
                </div>
                <div className="patient-details d-flex justify-content-between align-items-center">
                  <div>
                    <h5>sarah hosten</h5>
                    <span>Diagnosis:Bronchities</span>
                  </div>
                  <div>
                    <img
                      className="main-icons"
                      src={ellipsis}
                      anchor="edit"
                    ></img>
                  </div>
                </div>
              </div>
              <div className=" d-flex  justify-content-between align-items-center mt-2">
                <div className="patients-timing">
                  <p>11:15 am</p>
                </div>
                <div className="patient-details d-flex justify-content-between align-items-center">
                  <div>
                    <h5>Dakota smith</h5>
                    <span>Diagnosis:stroke</span>
                  </div>
                  <div>
                    <img
                      className="main-icons"
                      src={ellipsis}
                      anchor="edit"
                    ></img>
                  </div>
                </div>
              </div>
              <div className=" d-flex  justify-content-between align-items-center mt-2">
                <div className="patients-timing">
                  <p>12:30 am</p>
                </div>
                <div className="patient-details d-flex justify-content-between align-items-center">
                  <div>
                    <h5>Jhon lane</h5>
                    <span>Diagnosis:stroke</span>
                  </div>
                  <div>
                    <img
                      className="main-icons"
                      src={ellipsis}
                      anchor="edit"
                    ></img>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
