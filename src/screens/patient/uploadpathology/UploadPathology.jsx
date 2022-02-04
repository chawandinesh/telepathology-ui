import React, { useEffect, useState } from "react";
import _ from "lodash";
import ImageUpload from "../../../components/ImageUpload";
import { addReportFile, getUser, image_url } from "../../../helpers/helpers";
import "./uploadpathology.css";
import { Toast, ToastContainer } from "react-bootstrap";

const UploadPathology = () => {
  const [user,setUser] = useState(null)
  const [file, setFile] = useState(null);
  const ReportFile = new FormData();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  // const hasExistingSample = () => {
  //   console.log(localStorage.getItem(_.get(getUserData(), "_id")));
  //   return _.size(localStorage.getItem(_.get(getUserData(), "_id")));
  // };
  const getUserData = (id) => {
    getUser(id).then(res => {
      console.log(res,'res...');
      setUser(_.get(res,'data.data',''));
    }).catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    getUserData(_.get(JSON.parse(localStorage.getItem("user")),"_id",""))

  }, []);
  
  const getReportImage = () => {
    const url = _.get(user,"reportFile","") ? `${image_url}/${_.get(user,"reportFile","")}` : undefined;
    console.log(url);
    return url
    // return   window.localStorage.getItem(`${_.get(getUserData(),"_id")}u`)
  }
  const getFile = (file) => {
    console.log(file,'file..')
    setError(false);
    setSuccess(false);
    setFile(file);
    ReportFile.append("reportFile", file);
    ReportFile.append("data", JSON.stringify({ _id: _.get(user, "_id"), oldImage: "" }));
    addReportFile(ReportFile)
      .then((res) => {
        console.log(res,'res..');
        setSuccess(true);
        getUserData(_.get(JSON.parse(localStorage.getItem("user")),"_id",""))
        window.localStorage.setItem(`${_.get(user,"_id")}u`, file ? URL.createObjectURL(file) : undefined)
      })
      .catch((err) => {
        setError(true);
      });
  };
  console.log(user)

  console.log(getReportImage())
  // const getFile = (file) => {
  //   setFile(file);
  // };


  return (
    <div className="upload__pathology__container">
      <div className="upload__pathology__header">
        <h3>Upload Pathology Sample</h3>
      </div>
      <div className="upload__pathology">
        <ImageUpload hidelabel={true} getFile={getFile}>
          <div className="click__upload">
            {getReportImage() ? (
              <img src={getReportImage()} height="100%" width="100%" alt="nosample" />
            ) : (
              <p className="self-auto">Drag and drop (Or click to drop) a image file</p>
            )}
          </div>
          <input name="image" type="text" value={file ? file : ""} className="d-none" />
        </ImageUpload>
      </div>
      <ToastContainer position="top-end" className="p-3">
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
      </ToastContainer>
    </div>
  );
};

export default UploadPathology;
