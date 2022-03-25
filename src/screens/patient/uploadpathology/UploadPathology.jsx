import React, { useEffect, useState } from "react";
import _ from "lodash";
import ImageUpload from "../../../components/ImageUpload";
import { addReportFile, getUser, getPatientById, baseUrl } from "../../../helpers/helpers";
import "./uploadpathology.css";
import { Toast, ToastContainer } from "react-bootstrap";
import ToastComponent from "../../../components/ToastComponent";
import { storage } from "../../../firebase/firebase";
import { getDownloadURL } from "firebase/storage";

const UploadPathology = () => {
  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);
  const ReportFile = new FormData();
  const [state, setState] = useState({
    type: "",
    message: "",
    show: false,
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);


  const uploadImageToFireStore = (uploadImage) => {
    const uploadTask = storage.ref(`image`).put(uploadImage);
    // .getDownloadURL()
    // console.log(uploadTask);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
          console.log("File available at", downloadURL);
          if(downloadURL){
            await fetch(downloadURL).then(res => {
               console.log(res, "aftersubmit")
               setState({...state,message:"Successfully updated", show: true,type:'success'})

             }).catch(err => {
               console.log(err)
               setState({...state,message:"Failed to fetch", show: true,type:'danger'})
             })
          }
        });
      }
    );
  };

  useEffect(() => {
    console.log(file)
    uploadImageToFireStore(file)
  },[file])



  const getReportImage = () => {
    const url = _.get(user, "reportFile", "") ? `${baseUrl}/${_.get(user, "reportFile", "")}` : undefined;
    console.log(url);
    return url;
    // return   window.localStorage.getItem(`${_.get(getUserData(),"_id")}u`)
  };

  const getUserData = (id) => {
    getPatientById(id)
      .then((res) => {
        console.log(res, "res...");
        getReportImage();
        setUser(_.get(res, "data.data", ""));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUserData(_.get(JSON.parse(localStorage.getItem("user")), "_id", ""));
    getReportImage()
  }, []);

  console.log(file, "file...");

  const sendReportSample = (file) => {
    console.log(file,'file...');
    ReportFile.append("reportFile", file);
    ReportFile.append("data", JSON.stringify({ _id: _.get(user, "_id"), oldImage: _.get(user, "reportFile") }));
    addReportFile(ReportFile)
      .then((res) => {
        getUserData(_.get(JSON.parse(localStorage.getItem("user")), "_id", ""));
      })
      .catch((err) => {
        setError(true);
      });
  };

  // useEffect(() => {
  //   sendReportSample(file);
  // }, [file]);

  return (
    <div className="upload__pathology__container">
      <div className="dashboard__main__header">
        <h3>Upload Pathology Sample</h3>
      </div>
      <div className="upload__pathology d-flex align-items-center justify-content-center">
        <ImageUpload hidelabel={true} file={file} setFile={setFile} fileName={_.get(user, "reportFile")}>
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

      <ToastComponent state={state} setState={setState} />
    </div>
  );
};

export default UploadPathology;
