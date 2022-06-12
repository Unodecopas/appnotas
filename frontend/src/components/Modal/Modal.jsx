import React from "react";
import { ReactComponent as IconX } from "../../assets/x.svg";
import "./Modal.css";

const Modal = (props) => {
  return (
    <div className={`modal-container ${props.visible ? "visible" : ""}`}>
      <div
        className="modal"
        style={{ border: `2px solid var(${props.borderColor})` }}
      >
        <div className="close-button" onClick={props.handleClose}>
          <IconX />
        </div>
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
