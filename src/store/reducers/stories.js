import superagent from 'superagent';
import axios from 'axios';

// STATE
const initialState = {
  stories : [],
  newStory : {},
};

// REDUCER
export default (state = initialState ,action) =>{
  const { type , payload } = action;
  switch(type){

  case 'SHOW BLOG STORIES':
    return { ...state , stories : payload };

  case 'NEW STORY':
    return {...state , newStory : payload || {} };

  default:
    return state;
  }
};

// ACTIONS
export const getStoriesBlog = (blog) => dispatch => {
  let api = `https://api-marah.herokuapp.com/stories/${blog}`;
  return superagent.get(api)
    .then(data => {
      dispatch(handelStories( data.body ));
    });
};

export const handelStories = (payload) =>{
  return{
    type: 'SHOW BLOG STORIES',
    payload: payload,
  };
};


export const newStory = (username,token,story) => dispatch => {
  let api = `https://api-marah.herokuapp.com/newStory/${username}`;
  const options = {
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' ,'Authorization': `Bearer ${token}`},
    cache: 'no-cache',
  };
  axios.post(api,story,options)
    .then(data => {
      dispatch(newStoryAction( data.data ));
    });
};

export const newStoryAction = (payload) => {
  return {
    type: 'NEW STORY',
    payload: payload,
  };
};
  

