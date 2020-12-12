import React from "react";
import "./collection-preview.styles.scss";
import CollectionItem from "../collection-item/collection-item.component";

// Decide on Component 2, Homepage, Reusable Component
//pipeline 1->2.2

const CollectionPreview = ({ id, title, routeName, items }) => {
  return (
    <div className="collection-preview">
      <h1 className="title">{title.toUpperCase()}</h1>
      <div className="preview">
        {items
          .filter((item, idx) => idx < 4)
          .map(({ id, ...otherItemProps }) => {
            return <CollectionItem key={id} {...otherItemProps} />;
          })}
      </div>
    </div>
  );
};

export default CollectionPreview;
