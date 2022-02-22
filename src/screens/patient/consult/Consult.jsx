import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Form, Spinner, Table } from "react-bootstrap";
import moment from "moment";
import _ from "lodash";
import "./consult.css";
import MyImg from "../../../assets/images/alex.jpeg";
import * as yup from "yup";
import "../dashboard/patientdashboardmain.css";
import ReactSelectComponent from "../../../components/ReactSelectComponent";
import PathologistCard from "../../../components/PathologistCard";
import { addService, getAllPathologists, getPatientServiceById } from "../../../helpers/helpers";
import ModalComponent from "../../../components/ModalComponent";
import DatePickerComponent from "../../../components/DatePickerComponent";
import TimePickerComponent from "../../../components/TimePickerComponent";
import { useForm } from "react-hook-form";
import TextAreaComponent from "../../../components/TextAreaComponent";
import { yupResolver } from "@hookform/resolvers/yup";
import ToastComponent from '../../../components/ToastComponent'
function Consult() {
  const [value, setValue] = useState("");
  const [toastData, setToastData] = useState({
      show: false,
      type: "",
      message: ""
  })
  const [status, setStatus] = useState("Pending");
  const [services, setServices] = useState([]);
  const [modalData, setModalData] = useState({
    show: false,
    info: null,
  });

  const patientConsultSchema = yup.object().shape({
    date: yup.string().required("Date is required"),
    time: yup.string().required("Time is required"),
    information: yup.string().required("Information is required"),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(patientConsultSchema) });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(undefined);
  const [pathologistList, setPathologistList] = useState([]);
  const options = _.map(
    pathologistList.filter((e) => e.firstName || e.lastName),
    (each) => {
      return { value: each._id, label: `${each.firstName} ${each.lastName}` };
    }
  );
  // const options = [
  //   { value: "doctor1", label: "Doctor1" },
  //   { value: "doctor2", label: "Doctor2" },
  //   { value: "doctor3", label: "Doctor3" },
  // ];
  const handleGetValue = (value) => {
    setValue(value);
  };

  const getListOfPathologists = () => {
    getAllPathologists()
      .then((res) => {
        return res.data;
      })
      .then((result) => {
        // setPathologistList(result.data)
        setPathologistList(result.data.filter((e) => e.firstName || e.lastName));
      });
  };

  useEffect(() => {
    getPatientServiceById(_.get(JSON.parse(localStorage.getItem("user")), "_id", ""), status)
      .then((response) => {
        setServices(_.get(response, "data.data", ""));
      })
      .catch((err) => {
      });
  }, [status]);

  useEffect(() => {
    getListOfPathologists();
  }, []);
  console.log(errors);
  const onSubmit = (e) => {
    const pathologistId = _.get(selectedOption, "value", "");
    const patientId = _.get(JSON.parse(localStorage.getItem("user")), "_id", "");
    console.log(pathologistId, patientId, errors, e);

    addService({ ...e, patient: patientId, pathologist: pathologistId })
      .then((res) => {
        console.log(res);
        reset()
        setStatus("")
        setToastData({...toastData, show: true, type: "success", message: "Successfully Added"})
        setTimeout(() => {
            setStatus("Pending")
            setModalData({...modalData, show: false})
        }, 500);
      })
      .catch((err) => {
        setToastData({...toastData, show: true, type: "danger", message: "Fail to Add"})
        console.log(err);
      });
  };
  console.log(services, "services..");
  return (
    <div className="dashboard__main__container">
      <div className="dashboard__main__header">
        <h3>Consults</h3>
      </div>
      <div className="w-100 d-flex justify-content-between mt-2">
        <div></div>
        <ButtonGroup aria-label="Basic example">
            {
                ["Pending", "Confirmed","Rejected"].map(e => (

          <Button
            active
            variant="primary"
            style={{ backgroundColor: e === status ?   "#66d2F1" : "#66FCF1", color: "black" }}
            onClick={() => {
              setStatus(e);
            }}
          >
            {e}
          </Button>
                ))
            }
          {/* <Button
            variant="primary"
            style={{ backgroundColor: "#66FCF1", color: "black" }}
            onClick={() => {
              setStatus("Confirmed");
            }}
          >
            Accepted
          </Button>
          <Button
            variant="primary"
            style={{ backgroundColor: "#66FCF1", color: "black" }}
            onClick={() => {
              setStatus("Rejected");
            }}
          >
            Rejected
          </Button> */}
        </ButtonGroup>
        <button
          className="btn btn-outline-primary add__consult"
          onClick={() => setModalData({ ...modalData, show: true })}
          style={{ marginRight: "30px", borderColor: "#66FCF1", color: "#66FCF1" }}
        >
          Add Consult
        </button>
      </div>

      <h4 className="text-white" style={{ paddingLeft: "20px", textDecoration: "underline" }}>
        Your consults :
      </h4>

      <Table striped bordered hover responsive variant="dark">
        <thead>
          <tr>
            <th>Date and Time</th>
            <th>Pathologist Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {_.size(services) ? (
            _.map(services, (e, idx) => {
              console.log(e.time);
              const dateTime = `${moment(e.date).format("DD-MM-YYYY")} ${e.time}`;
              const name = `${_.get(e, "pathologist.firstName")} ${_.get(e, "pathologist.lastName")}`;
              return (
                <tr>
                  <td>{dateTime}</td>
                  <td>{name}</td>
                  <td>
                    <td>{e.status}</td>
                  </td>
                </tr>
              );
            })
          ) : (
            <h4 className="mt-3 text-center">No consults found</h4>
          )}
        </tbody>
      </Table>
      <ModalComponent
        hideSaveBtn
        handleSubmit={handleSubmit}
        title={"Consult a pathologist"}
        modalData={modalData}
        setModalData={setModalData}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ width: "100%", display: "flex", justifyContent: "center", marginBottom: 10 }}>
            <div style={{ width: "450px" }}>
              <label className="text-white form-label">Pathologist</label>
              <ReactSelectComponent
                getVal={handleGetValue}
                options={options}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
              />
            </div>
          </div>
          <DatePickerComponent
            name="date"
            label="Date"
            register={register}
            errorMessage={_.get(errors, "date.message", "")}
          />
          <TimePickerComponent
            name="time"
            label="Time"
            register={register}
            errorMessage={_.get(errors, "time.message", "")}
          />
          <TextAreaComponent
            name="information"
            label="Information"
            register={register}
            errorMessage={_.get(errors, "information.message", "")}
          />
          <Button className="w-100 mb-4 mt-2 primary__btn" variant="primary" type="submit">
            {submitLoading ? <Spinner animation="border" /> : "Submit"}
          </Button>
        </form>
      </ModalComponent>
      <ToastComponent setState={setToastData} state={toastData} />
    </div>
  );
}

export default Consult;
