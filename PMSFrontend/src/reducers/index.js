import { combineReducers } from 'redux';

import loginReducer from './loginReducer';
import registerReducer from './registerReducer';
// import projectsReducer from './projectsReducer';

const reducer = combineReducers({
  login : loginReducer,
  register : registerReducer,
  // allProject: projectsReducer
})

export default reducer;