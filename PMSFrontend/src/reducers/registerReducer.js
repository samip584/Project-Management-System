import * as registerAction from '../actions/registerAction';

const INITIAL_STATE = {
  registerName : '',
  registerEmail : '',
  registerPassword : '',
  registerRole     : '',
  registerError    : '',
};

function registerReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case registerAction.SET_NAME:
      return {
        ...state,
        registerName : action.payload,
      };
    
    case registerAction.SET_EMAIL:
      return {
        ...state,
        registerEmail : action.payload,
      };

    case registerAction.SET_PASSWORD:
      return {
        ...state,
        registerPassword : action.payload,
      };

    case registerAction.REGISTER_ERROR:
      return {
        ...state,
        registerError : action.payload,
      };
    
    case registerAction.SET_ROLE:
      return {
        ...state,
        registerRole : action.payload,
      };

    default:
      return state;
  }
}


export default registerReducer;