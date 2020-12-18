import React from "react";
import MenuItem from "../menu-item/menu-item.component";
import "./directory.styles.scss";
import SECTIONS_DATA from "./sections.data";

//Decide on Component 2, Directory, Reusable Component
//pipeline 1.1->2.1

class Directory extends React.Component {
  constructor() {
    super();
    this.state = {
      sections: SECTIONS_DATA,
    };
  }

  render() {
    //BrowserRouter HomePage -> props -> history,match,location
    return (
      <div className="directory-menu">
        {this.state.sections.map(({ id, ...otherSection }) => {
          return <MenuItem key={id} {...otherSection} />;
        })}
      </div>
    );
  }
}

export default Directory;
