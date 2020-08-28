import * as projectsAction from '../actions/projectsAction';

const INITIAL_STATE = {
  projects : [{}],
};

function projectsReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case projectsAction.SET_PROJECTS:
      return {
        ...state,
        projects : action.payload,
      };
    default:
      return state;
  }
}


export default projectsReducer;