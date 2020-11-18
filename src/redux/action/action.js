import * as actionTypes from "./actionTypes";
import setAuthorizationtoken from "../../services/utils/setAuthorizationtoken"
import { memoryHistory, browserHistory } from "../../helpers/history";

export const loginStart = () => {
  return {
    type: actionTypes.LOGIN_START,
  };
};

export const loginSuccess = (token, user, userTypeId) => {
  // debugger;
  return {
    
    type: actionTypes.LOGIN_SUCCESS,
    token: token,
    user: user,
    userTypeId: userTypeId,
    loading: false,
  };
};


export const logout = (token, user, userTypeId) => {
    //Clear the cache
  var language = localStorage.getItem("i18nextLng");
  var skipVideo = localStorage.getItem("skipVideo");
  localStorage.clear();
  sessionStorage.clear();
  // remove user from local storage to log user out
  localStorage.removeItem("user");
  localStorage.removeItem("jwtToken");
  localStorage.setItem("i18nextLng", language);
  localStorage.setItem("skipVideo", skipVideo);
  console.log(localStorage.getItem("skipVideo"));
  setAuthorizationtoken(false);
   browserHistory.push("/"); 
  return {
    type: actionTypes.AUTH_LOGOUT,
    token: null,
    user: null,
    userTypeId: null,
    loading: false,
  };
};