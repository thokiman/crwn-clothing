import React from "react";
import "./custom-button.style.scss";
//Decide on Component 4, MenuItem, Reusable Component
//pipeline 3.3,3.4->4.1
const CustomButton = ({
  isGoogleSignIn,
  children,
  inverted,
  ...otherProps
}) => {
  return (
    <button
      type="button"
      className={`${inverted ? "inverted" : ""}${
        isGoogleSignIn ? "google-sign-in" : ""
      } custom-button`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default CustomButton;
