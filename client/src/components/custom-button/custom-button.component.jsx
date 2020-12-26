import React from "react";
import { CustomButtonContainer } from "./custom-button.styles";
//Decide on Component 4 , CartDropdown, Reusable Component
//pipeline 2.3, 2.4, 3.2, 2.6 -> 4.2
const CustomButton = ({ children, ...props }) => {
  return (
    <CustomButtonContainer type="button" {...props}>
      {children}
    </CustomButtonContainer>
  );
};

export default CustomButton;
