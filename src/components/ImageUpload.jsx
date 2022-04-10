import { useState } from "react";
import { Form } from "react-bootstrap";
import { FileUploader } from "react-drag-drop-files";
// import "./styles.css";

const fileTypes = ["JPEG", "PNG"];

export default function ImageUpload({ file, setFile, fileName, hidelabel, children }) {
  return (
    <Form.Group className="mb-3 text__field image__file" controlId="formBasicEmail">
      {hidelabel ? <div></div> : <div className="b">Image</div>}
      <FileUploader children={children} handleChange={(e) => {
        setFile(e)
      }} name="file" types={fileTypes} />
      <p style={{ color: file ? "#0080ff" :"red" }}>
        {file ? `File name: ${file.name}` : fileName ? `File name: ${fileName}` : "no files uploaded yet"}
      </p>
    </Form.Group>
  );
}
