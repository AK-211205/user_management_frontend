import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Function to show success toast
export const showSuccessToast = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
  });
};

// Function to show error toast
export const showErrorToast = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
  });
};

// ToastNotify Component (only rendering ToastContainer)
const ToastNotify = () => {
  return (
    <>
      {/* ToastContainer renders all toasts globally */}
      <ToastContainer />
    </>
  );
};

export default ToastNotify;
