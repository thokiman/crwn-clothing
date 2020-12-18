import React from "react";
import "./homepage.styles.scss";
import Directory from "../../components/directory/directory.component";
// Decide on Component 1, Homepage, Non-Reusable Component
//pipeline 0->1.1
const Homepage = () => {
  return (
    <div className="homepage">
      <Directory />
    </div>
  );
};

export default Homepage;
