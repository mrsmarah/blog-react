import axios from 'axios';
const API = 'https://api-marah.herokuapp.com';

// STATE
const initState = {
  adminPage: [],
};

// REDUCERS
export default (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {

  case 'GET All ADMIN':
    return {...state , adminPage: payload.results , role:'admin'};
  
  case 'EDIT ADMIN':
    let adminPage = state.adminPage.map((story) =>
      story._id === payload._id ? payload : story);
    return {...state, adminPage: adminPage };
 
  default:
    return state;
  }
};

// ACTIONS
export const getAllAdmin = (token) => dispatch => {
  const options = {
    mode: 'cors',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    cache: 'no-cache',
  };
  axios.get(`${API}/statusAll`, options)
    .then(res => {
      dispatch(getAllAdminAction( {results: res.data})); 
    })
    .catch(e => {
      console.error();
    });
};

export const getAllAdminAction = (payload) => {
  return {
    type: 'GET All ADMIN',
    payload: payload,
  };
};


export const editAdmin = (id, newStory, token) => dispatch => {
  const options = {
    mode: 'cors',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    cache: 'no-cache',
  };
  axios.put(`${API}/status/${id}`, newStory, options)
    .then(res => {
      dispatch(editAdminAction(res.data));
    })
    .catch(e => {
      console.error();
    });
};

export const editAdminAction = (payload) => {
  return {
    type: 'EDIT ADMIN',
    payload: payload,
  };
};
