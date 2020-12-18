import React from "react";
import "./custom-button.style.scss";
//Decide on Component 4 , CartDropdown, Reusable Component
//pipeline 2.3, 2.4, 3.2, 2.6 -> 4.2
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
