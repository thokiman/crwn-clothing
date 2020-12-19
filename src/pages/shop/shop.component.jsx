import React from "react";
import { Route } from "react-router-dom";

import CollectionPage from "../collection/collection.component";
import CollectionOverview from "../../components/collection-overview/collection-overview.component";
import "./shop.styles.scss";

// Decide on Component 1, Shop, Non-Reusable Component
//pipeline 0->1.2
const ShopPage = ({ match }) => {
  return (
    <div className="shop-page">
      <Route exact path={`${match.path}`} component={CollectionOverview} />
      <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
    </div>
  );
};

export default ShopPage;
