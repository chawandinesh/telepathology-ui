import React from "react";
import { Table } from "react-bootstrap";

const DiagnosisAndComments = () => {
    const item = {
        uploadedDate: "12-02-2022",
        name: "Sample Image",
        image:() => (<span className="p-2 border 1px solid #000">testsuer</span>),
        comment: "test comment...",
      };
  return (
    <div className="upload__pathology__container">
      <div className="dashboard__main__header">
        <h3>Diagnosis and Comments</h3>
      </div>
      <Table striped bordered hover responsive variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Uploaded Date</th>
            <th>Name</th>
            <th>comment</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 234232, 4324, 23, 12, 3434, 34343, 5454, 34232, 3424, 4535, 3542].map((e, idx) => (
            <tr>
              <td>{idx}</td>
              <td>{item.uploadedDate}</td>
              <td>{item.name}</td>
              <td>{item.comment}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DiagnosisAndComments;
