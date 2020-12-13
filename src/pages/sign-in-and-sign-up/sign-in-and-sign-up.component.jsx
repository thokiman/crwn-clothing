import React from "react";
import "./sign-in-and-sign-up.styles.scss";
import SignIn from "../../components/sign-in/sign-in.component";
// Decide on Component 1, Homepage, Non-Reusable Component
//pipeline 0->1.3
const SignInAndSignUpPage = () => {
  return (
    <div className="sign-in-and-sign-out">
      <SignIn />
    </div>
  );
};

export default SignInAndSignUpPage;
