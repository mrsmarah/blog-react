import cookie from 'react-cookies';
import axios from 'axios';
const API = 'https://api-marah.herokuapp.com';

// STATE
const initialState = {
  loggedIn: false,
  user: {},
  token: '',
};

// REDUCERS
export default (state = initialState, action) => {
  const { type, payload } = action;
  
  switch (type) {
  case 'setUserIn':
    return {...state, user:payload.user , loggedIn : true, token: payload.token };
  
  case 'logout':
    cookie.save('auth', 'token',{ path: '/' });
    return initialState;

  default:
    return state;
  }
};

// ACTIONS
export const signup = (username, password) => {
  return async dispatch => {
    const options = {
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-cache',
    };
    let response = await axios.post(`${API}/signup`, { username, password }, options);
    await cookie.save('auth', response.data.token, { path: '/' });
    await dispatch(setUserIn({user: username, token: response.data.token}));
  };  
};


export const login = (username, password)  => {
  return async dispatch =>{
    const options = {
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' ,'Authorization': `Basic ${btoa(`${username}:${password}` )}`},
      cache: 'no-cache',
    };
    let response = await axios.post(`${API}/signin`, {}, options);
    await cookie.save('auth', response.data.token, { path: '/' });
    await dispatch(setUserIn({user: username, token: response.data.token}));  
  };
};

export const logout = () => {
  return {
    type: 'logout',
    payload: 'payload',
  };
};

export const setUserIn = (obj) => { 
  return {
    type: 'setUserIn',
    payload: obj,
  };
};

