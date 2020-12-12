import React from "react";
import "./menu-item.styles.scss";
import { withRouter } from "react-router-dom";
//Decide on Component 3, MenuItem, Reusable Component
//pipeline 2->3.1 -> 3.5
const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => {
  //BrowserRouter HomePage -> props -> history,match,location
  return (
    <div
      className={`${size} menu-item`}
      onClick={() => history.push(`${match.url}${linkUrl}`)}
    >
      <div
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="content">
        <h1 className="title">{title.toUpperCase()}</h1>
        <span className="subtitle">SHOP NOW</span>
      </div>
    </div>
  );
};

export default withRouter(MenuItem);
