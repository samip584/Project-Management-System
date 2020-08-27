export const SET_NAME = 'SET_NAME';
export const SET_EMAIL = 'SET_EMAIL';
export const SET_PASSWORD = 'SET_PASSWORD';
export const SET_ROLE  = 'SET_ROLE';
export const USER_REGISTER = 'USER_REGISTER';
export const REGISTER_ERROR = 'REGISTER_ERROR';
export const REDIRECT =  'REDIRECT';

export const setPassword = password => ({
  payload : password,
  type : SET_PASSWORD,
});

export const setName = name => ({
  payload : name,
  type : SET_NAME
});

export const setEmail = email => ({
  payload : email,
  type : SET_EMAIL
});

export const setRole = role => ({
  payload : role,
  type : SET_ROLE
});

export const redirect = val => ({
  payload : val,
  type : REDIRECT
});

export const userRegister = (name, email, password, role) => {
  return function action(dispatch) {
    dispatch({
      type : USER_REGISTER
    })
    console.log(window.localStorage.getItem('token'))
    return fetch('http://localhost:8000/api/register', {
      method  : 'POST',
      headers : {
      'Authorization' : window.localStorage.getItem('token'),
      'content-type': 'application/json'
      },
      body : JSON.stringify({
        name : name,
        email : email,
        password : password,
        role : role
      })
    })
    .then(res => res.json())
    .then(res => {
      if (res.status === 400)  {
        dispatch({
          type    : REGISTER_ERROR,
          payload : res.msg
        })
      }
      else if (res.status === 200) {
        dispatch({
          type : REDIRECT,
          payload : true
        })
      }
    })
    .catch(err => console.log(err));
  }
} 