import React, { useEffect, useState } from "react";
import { getPathologistServiceById, updateServiceById } from "../../../helpers/helpers";
import _ from "lodash";
import moment from "moment";
import { Table } from "react-bootstrap";
import { BsCheck, BsPencil } from "react-icons/bs";
import ModalComponent from "../../../components/ModalComponent";
import { FaCross, FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";
import ToastComponent from '../../../components/ToastComponent'
const ConsultRequests = () => {
  const [state, setState] = useState({
    show: false,
    message:"",
    type: ""
  })
  const [requests, setRequests] = useState([]);
  const [modalData, setModalData] = useState({
    show: false,
    info: {},
  });
  const id = _.get(JSON.parse(localStorage.getItem("user")), "_id", "");
  console.log(id, "id..");
  const getPathologistService = () => {
    getPathologistServiceById(id, "Pending").then((res) => {
      setRequests(_.get(res, "data.data", ""));
    });
  }
  useEffect(() => {
    getPathologistService()
  }, []);
  

  const handleAccept = (data) => {
    console.log(data)
    updateServiceById({
      "_id":_.get(data,'_id'),
      status: "Confirmed"
    }).then(res => {
      console.log(res)
      setState({...state,show: true, message: "Confirmation Successful", type: "success"})
      setTimeout(() => {
        getPathologistService()
      }, 300);
    }).catch(err => {
      console.log(err)
      setState({...state,show: true, message: "Confirmation Fail", type: "danger"})
    })
  }

  const handleReject = (data) => {
    updateServiceById({
      "_id":_.get(data,'patient._id'),
      status: "Rejected"
    }).then(res => {
      console.log(res)
      setState({...state,show: true, message: "Rejected Successful", type: "success"})
    }).catch(err => {
      console.log(err)
      setState({...state,show: true, message: "Rejected Fail", type: "danger"})
    })
  }

  return (
    <div className="upload__pathology__container mt-4">
      <div className="dashboard__main__header">
        <h3>Consultation requests</h3>
      </div>
      <h4 className="text-white" style={{ paddingLeft: "20px", textDecoration: "underline" }}>
        Your consults :
      </h4>

      <Table striped bordered hover responsive variant="dark">
        <thead>
          <tr style={{ textAlign: "center" }}>
            <th>Date and Time</th>
            <th>patient Name</th>
            <th>Information</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {_.size(requests) ? (
            _.map(requests, (e, idx) => {
              console.log(e.time);
              const dateTime = `${moment(e.date).format("DD-MM-YYYY")} ${e.time}`;
              const name = `${_.get(e, "patient.firstName")} ${_.get(e, "patient.lastName")}`;
              return (
                <tr style={{ textAlign: "center" }}>
                  <td>{dateTime}</td>
                  <td>{name}</td>
                  <td>{e.information}</td>
                  <td>{e.status}</td>
                  <td>
                    <FaRegCheckCircle onClick={() => handleAccept(e)} style={{color: '#393', fontSize: 25, cursor:'pointer'}}/>
                    <FaRegTimesCircle onClick={() => handleReject(e)} style={{color: "#933", fontSize: 25, marginLeft: "15px", cursor:'pointer'}}/>
                    {/* <BsPencil
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setModalData({ ...modalData, show: true, info: e });
                      }}
                    /> */}
                  </td>
                </tr>
              );
            })
          ) : (
            <h4 className="mt-3 text-center">No consults found</h4>
          )}
        </tbody>
      </Table>
      {modalData.show ? (
        <ModalComponent hideSaveBtn title="Slot Request" modalData={modalData} setModalData={setModalData}>
          <div style={{position:'relative',height: "50vh"}}>
            <div>
              <label style={{ textDecoration: "underline", paddingBottom: 10 }}>Information:</label>
              <p>{_.get(modalData, "info.information")}</p>
            </div>

            <div className="w-100 d-flex justify-content-end mr-3" style={{position:'absolute', bottom: 10}}>
              <button className="accept mr-2 btn btn-primary" style={{margin: "10px", backgroundColor: "#66FCF1",color:'black'}} onClick={handleAccept}>Accept</button>
              <br/>
              <button className="reject ml-2 btn btn-danger" style={{backgroundColor: "#f67"}} onClick={handleReject}>Reject</button>
            </div>
          </div>
        </ModalComponent>
      ) : null}
      <ToastComponent state={state} setState={setState}/>
    </div>
  );
};

export default ConsultRequests;
