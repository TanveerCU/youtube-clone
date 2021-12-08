import { auth } from "../actionType";

const initialState = {
  accessToken: sessionStorage.getItem("ytc-access-token")
    ? sessionStorage.getItem("ytc-access-token")
    : null,
  user: sessionStorage.getItem("ytc-user")
    ? JSON.parse(sessionStorage.getItem("ytc-user"))
    : null,
  loading: false,
};

export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case auth.LOGIN_REQUEST:
      return { ...state, loading: true };
    case auth.LOGIN_SUCCESS:
      return { ...state, accessToken: payload, loading: false };
    case auth.LOGIN_FAIL:
      return { ...state, accessToken: null, loading: false, error: payload };
    case auth.LOAD_PROFILE:
      return { ...state, user: payload, loading: false };
    case auth.LOG_OUT:
      return {
        ...state,
        accessToken: null,
        user: null,
      };
    default:
      return state;
  }
};
