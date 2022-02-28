import React from "react";
import { Alert } from "react-bootstrap";
const Message = ({ children, type }) => {
  return (
    <Alert className="my-3" variant={type}>
      {children}
    </Alert>
  );
};

export default Message;
