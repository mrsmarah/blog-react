import superagent from 'superagent';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';
import axios from 'axios';
const API = 'https://api-marah.herokuapp.com';

const initialState = {
  loggedIn: false,
  user: {},
  token: '',
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  console.log('action ---->',payload,type);
  
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



const validateToken = (token,dispatch) => {
  try {
    let api = `https://api-marah.herokuapp.com`;
    console.log('token--->',token);
    let user = jwt.verify(token, 'marah');

    superagent.get(api)
      .set('Content-Type', 'application/json' )
      .set('Authorization',`Bearer ${token}`)
      .then(data => {
        console.log('token state',data.body);
        if(data.body === 'token'){
          dispatch(logout());
        }
      });
    cookie.save('auth', token, { path: '/' });
  
  } catch (err) {
    dispatch(logout());
    console.log('token Validation error',err);
  }
};

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
    console.log("res",response);
  };  
};


export const login = (username, password)  => {
  return async dispatch =>{
    console.log('username, password---------------->',username, password);
    const options = {
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' ,'Authorization': `Basic ${btoa(`${username}:${password}` )}`},
      cache: 'no-cache',
    };
    let response = await axios.post(`${API}/signin`, {}, options);
    console.log('res1--->',response);
    await cookie.save('auth', response.data.token, { path: '/' });
    await dispatch(setUserIn({user: username, token: response.data.token}));
    console.log('res--->',response);
  
  };
  
};

export const load = () => dispatch => {
  const cookieToken = cookie.load('auth');
  const token = cookieToken || null;
  validateToken(token,dispatch);
};



export const logout = () => {
  return {
    type: 'logout',
    payload: 'payload',
  };
};

export const setUserIn = (obj) => { 
  console.log("obj",obj);
  return {
    type: 'setUserIn',
    payload: obj,
  };
};

