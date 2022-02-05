import React from "react";
import { ToastContainer, Toast } from "react-bootstrap";

const ToastComponent = ({state,setState }) => {
  const {type, show, message} = state
  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast onClose={() => setState({...state, show:false})} bg={type} show={show} delay={3000} autohide>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          {type === "success" ? (
            <strong className="me-auto">Success</strong>
          ) : type === "danger" ? (
            <strong className="me-auto">Failed</strong>
          ) : (
            <div />
          )}
          <small className="text-muted">just now</small>
        </Toast.Header>
        <Toast.Body style={{ color: "#fff" }}>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastComponent;
