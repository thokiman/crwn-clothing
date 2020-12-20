import React from "react";

import { SignInAndSignUpContainer } from "./sign-in-and-sign-up.styles";
import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";

// Decide on Component 1, SignInAndSignUp, Non-Reusable Component
//pipeline 0->1.3
const SignInAndSignUpPage = () => {
  return (
    <SignInAndSignUpContainer>
      <SignIn />
      <SignUp />
    </SignInAndSignUpContainer>
  );
};

export default SignInAndSignUpPage;
