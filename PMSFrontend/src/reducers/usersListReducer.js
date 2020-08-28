import * as usersListAction from '../actions/usersListAction';

const INITIAL_STATE = {
  users : [],
};

function usersListReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case usersListAction.SET_USERS_LIST:
      return {
        ...state,
        users : action.payload,
      };
    
    default:
      return state;
  }
}


export default usersListReducer;