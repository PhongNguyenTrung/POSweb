import { FIND_PRODUCT, DELETE_CART, CLEAN_CART } from "../const";

export const ProductReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case FIND_PRODUCT:
      return {
        ...state,
        cart: [...state.cart, payload],
      };

    case DELETE_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== payload),
      };

    case CLEAN_CART:
      return {
        ...state,
        cart: payload,
      };

    default:
      return state;
  }
};
