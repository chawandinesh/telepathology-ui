import React, { useState } from "react";
import ImageUpload from "../../../components/ImageUpload";
import "./uploadpathology.css";
const UploadPathology = () => {
  const [file, setFile] = useState(null);

  const getFile = (file) => {
    setFile(file);
  };

  const url = file ? URL.createObjectURL(file) : undefined
  console.log(url);
  return (
    <div className="upload__pathology__container">
      <div className="upload__pathology__header">
        <h3>Upload Pathology Sample</h3>
      </div>
      <div className="upload__pathology">
        <ImageUpload hidelabel={true} getFile={getFile}>
           <div className="click__upload">
               {
                   url ?
                   <img src={url} height="100%" width="100%" alt="nosample"/>
                   :
              <p className="self-auto">Drag and drop (Or click to drop) a image file</p>
               }
           </div>    
          <input name="image" type="text" value={file ? file : ""} className="d-none" />
        </ImageUpload>
      </div>
    </div>
  );
};

export default UploadPathology;
