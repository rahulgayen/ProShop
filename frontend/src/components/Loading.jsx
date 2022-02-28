import React from "react";
import { Spinner, Modal } from "react-bootstrap";
const Loading = () => {
  return (
    <>
      <Modal show={true} backdrop="static" centered keyboard={false}>
        <Modal.Body>
          <Spinner animation="border" size="md" variant="light"></Spinner>
          <h3 className="ms-3 d-inline">Loading...</h3>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Loading;
