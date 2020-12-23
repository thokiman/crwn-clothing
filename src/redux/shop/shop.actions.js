import ShopActionTypes from "./shop.types";
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";

export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap,
});

export const fetchCollectionsFailure = (errorMessage) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage,
});
export const fetchCollectionsStartAsync = () => {
  //from redux mapDispatchToProps: fetchCollectionsStart get called, 1st dispatch
  return (dispatch) => {
    //from redux thunk: return function dispatch again
    const collectionRef = firestore.collection("collections");
    //from redux thunk: use function dispatch again, 2nd multiple call action
    dispatch(fetchCollectionsStart());
    collectionRef
      .get()
      .then(async (snapshot) => {
        console.log(
          "this is shop.component// componentDidMount/ .onSnapshot :",
          snapshot
        );
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        console.log(
          "this is shop.component// componentDidMount/ collectionMap :",
          collectionsMap
        );
        //from redux thunk: use function dispatch again,3rd multiple call action
        dispatch(fetchCollectionsSuccess(collectionsMap));
      })
      .catch((error) => dispatch(fetchCollectionsFailure(error.message)));
  };
};
