import * as loginAction from '../actions/loginAction';


const INITIAL_STATE = {
  loginEmail : '',
  loginPassword : '',
  loginError    : '',
  logedIn : false,
};

function loginReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case loginAction.SET_EMAIL:
      return {
        ...state,
        loginEmail : action.payload,
      };

    case loginAction.SET_PASSWORD:
      return {
        ...state,
        loginPassword : action.payload,
      };

    case loginAction.LOGIN_ERROR:
      return {
        ...state,
        loginError : action.payload,
      };

    case loginAction.SET_LOGGED_IN:
      return {
        ...state,
        logedIn : action.payload,
      };

    default:
      return state;
  }
}

export default loginReducer;