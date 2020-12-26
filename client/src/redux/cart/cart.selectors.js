import { createSelector } from "reselect";

const selectCart = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);
// createStore create new instance from createStore function
// and called by selectCartItemsCount(state)
export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity,
      0
    )
);
// createStore create new instance from createStore function
// and called by selectCartTotal (state)
export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (accumulatedQuantity, cartItem) =>
      accumulatedQuantity + cartItem.price * cartItem.quantity,
    0
  )
);
// createStore create new instance from createStore function
// and called by selectCartHidden(state)
export const selectCartHidden = createSelector(
  [selectCart],
  (cart) => cart.hidden
);
