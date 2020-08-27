export const SET_EMAIL = 'SET_EMAIL';
export const SET_PASSWORD = 'SET_PASSWORD';
export const USER_LOGIN  = 'USER_LOGIN';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const SET_LOGGED_IN = 'SET_LOGGED_IN';

export const setEmail= email => ({
  payload : email,
  type : SET_EMAIL,
});

export const setPassword = password => ({
  payload : password,
  type    : SET_PASSWORD,
});

export const setLogged_in = () => ({
  payload : true,
  type : SET_LOGGED_IN,
});

export const userLogin = (email, password) => {
  return function action(dispatch) {
    dispatch({
      type : USER_LOGIN
    })
    return fetch('http://localhost:8000/api/login', {
                  method  : 'POST',
                  headers : {
                  'content-type': 'application/json'
                  },
                  body : JSON.stringify({
                    email : email,
                    password : password,
                  })
                })
            .then(res => res.json())
            .then(res => {
              if (res.token) {
                console.log(res.token)
                window.localStorage.setItem('token', res.token)
                window.location.reload(true);
              } else {
                dispatch({
                  type    : LOGIN_ERROR,
                  payload : res.msg
                })
              }
            })
            .catch(err => console.log(err));
  }
}