import React, { useEffect } from "react";
import ReactDOM from "react-dom";

const modalRoot = document.getElementById("modal-root");

const MessageModal = ({ message, onClose, type = "success" }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // auto close after 3 seconds
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  // Set background color based on message type
  const bgColor = type === "error" ? "bg-red-500" : "bg-green-500";

  return ReactDOM.createPortal(
    <div className={`fixed top-4 right-4 z-50 p-4 rounded-xl shadow-lg text-white animate-bounce-in ${bgColor}`}>
      <p>{message}</p>
    </div>,
    modalRoot
  );
};

export default MessageModal;
