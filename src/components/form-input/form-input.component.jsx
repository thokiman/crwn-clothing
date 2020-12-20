import React from "react";

import {
  GroupContainer,
  FormInputContainer,
  FormInputLabel,
} from "./form-input.styles";

//Decide on Component 4, FormInput, Reusable Component
//pipeline 2.3, 2.4 -> 4.1
const FormInput = ({ handleChange, label, ...props }) => {
  return (
    <GroupContainer>
      <FormInputContainer onChange={handleChange} {...props} />
      {label ? (
        <FormInputLabel className={`${props.value.length ? "shrink" : ""}`}>
          {label}
        </FormInputLabel>
      ) : null}
    </GroupContainer>
  );
};

export default FormInput;
