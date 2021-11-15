import { GET_USER } from "../const";

export const AuthReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_USER:
      return {
        ...state,
        user: payload,
      };

    default:
      return state;
  }
};
