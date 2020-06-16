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
  localStorage.clear();
  sessionStorage.clear();
  // remove user from local storage to log user out
  localStorage.removeItem("user");
  localStorage.removeItem("jwtToken");
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