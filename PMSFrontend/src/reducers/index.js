import { combineReducers } from 'redux';

import loginReducer from './loginReducer';
import registerReducer from './registerReducer';
import usersListReducer from './usersListReducer'
import projectsReducer from './projectsReducer';

const reducer = combineReducers({
  login : loginReducer,
  register : registerReducer,
  projects: projectsReducer,
  usersList: usersListReducer,
})

export default reducer;