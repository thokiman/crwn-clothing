import { createSelector } from "reselect";

const selectUser = (state) => state.user;
// createStore create new instance from createStore function
// and called by selectCurrentUser (state)
export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);
