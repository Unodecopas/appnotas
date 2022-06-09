import React from "react";
import "./Modal.css";

const Modal = (props) => {
    return (
        <div className={`modal-container ${props.visible ? "visible" : ""}`}>
            <div className="modal">
                <div className="close-button" onClick={props.handleClose}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </div>
                {props.children}
            </div>
        </div>
    );
};

export default Modal;
