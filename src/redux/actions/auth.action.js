import { auth } from "../actionType";
import firebase from "firebase/compat/app";
import googleAuth from "../../firebase";
export const logIn = () => async (dispatch) => {
  try {
    dispatch({
      type: auth.LOGIN_REQUEST,
    });

    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/youtube.force-ssl");

    const res = await googleAuth.signInWithPopup(provider);

    const accessToken = res.credential.accessToken;

    const profile = {
      name: res.additionalUserInfo.profile.name,
      picture: res.additionalUserInfo.profile.picture,
    };

    sessionStorage.setItem("ytc-access-token", accessToken);
    sessionStorage.setItem("ytc-user", JSON.stringify(profile));

    dispatch({
      type: auth.LOGIN_SUCCESS,
      payload: accessToken,
    });

    dispatch({
      type: auth.LOAD_PROFILE,
      payload: profile,
    });
  } catch (error) {
    dispatch({
      type: auth.LOGIN_FAIL,
      payload: error.message,
    });
  }
};

export const log_out = () => async (dispatch) => {
  await googleAuth.signOut();
  dispatch({
    type: auth.LOG_OUT,
  });

  sessionStorage.removeItem("ytc-access-token");
  sessionStorage.removeItem("ytc-user");
};
