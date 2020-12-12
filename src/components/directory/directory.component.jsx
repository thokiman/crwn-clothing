import React from "react";
import MenuItem from "../menu-item/menu-item.component";
import "./directory.styles.scss";

//Decide on Component 2, Directory, Reusable Component
//pipeline 1->2.1

class Directory extends React.Component {
  constructor() {
    super();
    this.state = {
      sections: [
        {
          title: "hats",
          imageUrl: "https://i.ibb.co/cvpntL1/hats.png",
          id: 1,
          linkUrl: "hats",
        },
        {
          title: "jackets",
          imageUrl: "https://i.ibb.co/px2tCc3/jackets.png",
          id: 2,
          linkUrl: "",
        },
        {
          title: "sneakers",
          imageUrl: "https://i.ibb.co/0jqHpnp/sneakers.png",
          id: 3,
          linkUrl: "",
        },
        {
          title: "womens",
          imageUrl: "https://i.ibb.co/GCCdy8t/womens.png",
          size: "large",
          id: 4,
          linkUrl: "",
        },
        {
          title: "mens",
          imageUrl: "https://i.ibb.co/R70vBrQ/men.png",
          size: "large",
          id: 5,
          linkUrl: "",
        },
      ],
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
