import * as actionTypes from "./action/actionTypes";

const initialState = {
  token: null,
  user: JSON.parse(localStorage.getItem("user")),
  homeData: null,
  mediaData: null,
  success: null,
  message: null,
  error: null,
  loading: false,
  authRedirectPath: "/",
  userTypeId: null,
  data: null,
  searchData: [],
  selectedLanguage: localStorage.getItem("langName"),
  productList :[],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_START:
      return {
        ...state,
        error: null,
        success: null,
        loading: true,
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.token,
        user: action.user,
        userTypeId: action.userTypeId,
        error: null,
        loading: false,
      };
    case actionTypes.LOGIN_FAIL:
      return {
        ...state,
        error: action.error,
        success: null,
        loading: false,
      };
    case actionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        success: action.success,
        message: action.message,
        error: action.error,
        invalidFlag: action.invalidFlag,
        loading: false,
      };
    case actionTypes.SIGNUP_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        user: null,
        userTypeId: null,
        error: null,
        loading: false,
      };
  
    
        default:
      return state;
  }
};

export default reducer;
