import superagent from 'superagent';
import axios from 'axios';

// STATE
const initialState = {
  oneStory : {comment:[]},
};

// REDUCER
export default (state = initialState ,action) =>{
  const { type , payload } = action;
  switch(type){
  
  case 'SELECTED':
    return {...state, oneStory : payload };

  case 'ADD COMMENT':
    return { oneStory : payload };

  default:
    return state;
  }
};

// ACTIONS
export const getOneStory = (id)  => dispatch => {
  let api = `https://api-marah.herokuapp.com/story/${id}`;
  return superagent.get(api)
    .set('Content-Type', 'application/json' )
    .then(data => {
      dispatch( getStory(data.body));
    });};


export const getStory = (payload) => {
  return {
    type: 'SELECTED',
    payload: payload[0],
  };
};


export const addComment = ( id , token , comment ) => dispatch => {
  let api = `https://api-marah.herokuapp.com/addToStory/${id}`;
  const options = {
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' ,'Authorization': `Bearer ${token}`},
    cache: 'no-cache',
  };
  axios.post(api,comment,options)
    .then(data => {
      dispatch(addCommentAction( data.data ));
    });
};

export const addCommentAction = (payload) => {
  return {
    type: 'ADD COMMENT',
    payload: payload,
  };
};


 
