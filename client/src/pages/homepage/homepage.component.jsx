import React from "react";

import { HomePageContainer } from "./homepage.styles";

import Directory from "../../components/directory/directory.component";
// Decide on Component 1, Homepage, Non-Reusable Component
//pipeline 0->1.1
const Homepage = () => {
  // throw Error;
  return (
    <HomePageContainer>
      <Directory />
    </HomePageContainer>
  );
};

export default Homepage;
