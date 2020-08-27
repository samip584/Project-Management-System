export const GET_PROJECTS = 'GET_PROJECTS';
export const SET_PROJECTS = 'SET_PROJECTS';

export const getProjects = () => {
  return function action(dispatch) {
    dispatch({
      type : GET_PROJECTS
    })
    return fetch('http://localhost:5000/api/project/all', {
                  method : 'GET',
                  headers : {
                    'authentication' : window.localStorage.getItem('token')
                  }
                })
                .then(res => res.json())
                .then(res => {
                  if (res.length) {
                  dispatch({
                    type : SET_PROJECTS,
                    payload : res
                  })
                }
            })
            .catch(err => console.log(err));
  }
} 