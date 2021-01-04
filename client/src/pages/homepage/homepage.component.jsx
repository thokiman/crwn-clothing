import React, { Profiler } from "react";

import { HomePageContainer } from "./homepage.styles";

import Directory from "../../components/directory/directory.component";
// Decide on Component 1, Homepage, Non-Reusable Component
//pipeline 0->1.1
const Homepage = () => {
  // throw Error;
  return (
    <HomePageContainer>
      <Profiler
        id="Directory"
        onRender={(id, phase, actualDuration) => {
          console.log("this is profiler :", { id, phase, actualDuration });
        }}
      >
        <Directory />
      </Profiler>
    </HomePageContainer>
  );
};

export default Homepage;
