import { useState } from "react";
import { Form } from "react-bootstrap";
import { FileUploader } from "react-drag-drop-files";
// import "./styles.css";

const fileTypes = ["JPEG", "PNG"];

export default function ImageUpload({children, getFile, hidelabel}) {
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
    getFile(file)
  };

  return (
    <Form.Group className="mb-3 text__field image__file" controlId="formBasicEmail">
     {hidelabel ? <div></div> :<div className="text-white">Image</div>}
      <FileUploader children={children} handleChange={handleChange} name="file" types={fileTypes} />
      <p style={{color: "#66fcf1"}}>{file ? `File name: ${file.name}` : "no files uploaded yet"}</p>
    </Form.Group>
  );
}
