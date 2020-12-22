import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import CollectionPage from "../collection/collection.component";
import CollectionsOverview from "../../components/collection-overview/collection-overview.component";
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";
import { updateCollections } from "../../redux/shop/shop.actions";
import WithSpinner from "../../components/with-spinner/with-spinner.component";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

// Decide on Component 1, Shop, Non-Reusable Component
//pipeline 0->1.2
class ShopPage extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }
  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection("collections");
    this.unsubscribeFromSnapshot = collectionRef.onSnapshot(
      async (snapshot) => {
        console.log(
          "this is shop.component// componentDidMount/ .onSnapshot :",
          snapshot
        );
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        console.log(
          "this is shop.component// componentDidMount/ collectionMap :",
          collectionsMap
        );
        updateCollections(collectionsMap);
        this.setState({ loading: false });
      }
    );
    console.log(
      "this is unssubscribeFromSnapshot func :",
      this.unsubscribeFromSnapshot
    );
  }

  render() {
    const { match } = this.props;
    const { loading } = this.state;
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          render={(props) => (
            <CollectionsOverviewWithSpinner isLoading={loading} {...props} />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={(props) => (
            <CollectionPageWithSpinner isLoading={loading} {...props} />
          )}
        />
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  updateCollections: (collectionsMap) =>
    dispatch(updateCollections(collectionsMap)),
});
export default connect(null, mapDispatchToProps)(ShopPage);
