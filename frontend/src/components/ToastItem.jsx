import { useState } from "react";
import { ToastContainer, Toast } from "react-bootstrap";
const ToastItem = ({ message }) => {
  const [show, setShow] = useState(true);
  return (
    <ToastContainer className="p-3" position="top-end">
      <Toast bg="light" onClose={() => setShow(false)} show={show ? 1 : 0} delay={3000} autohide={1}>
        <Toast.Body>
          <strong className="me-auto">{message}</strong>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastItem;
