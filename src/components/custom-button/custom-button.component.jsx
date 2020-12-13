import React from "react";
import "./custom-button.style.scss";
//Decide on Component 5, MenuItem, Reusable Component
//pipeline 4->5
const CustomButton = ({ isGoogleSignIn, children, ...otherProps }) => {
  return (
    <button
      className={`${isGoogleSignIn ? "google-sign-in" : ""} custom-button`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default CustomButton;
