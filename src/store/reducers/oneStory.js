import superagent from 'superagent';
import cookie from 'react-cookies';
import axios from 'axios';


const initialState = {
  oneStory : {comment:[]},
};

export default (state = initialState ,action) =>{
  const { type , payload } = action;
  switch(type){
  
  case 'SELECTED':
    // console.log( type, payload);
    return {...state, oneStory : payload};

  case 'ADD COMMENT':
    // console.log( type, payload);
    return { oneStory : payload };

  default:
    return state;
  }
};


export const getOneStory = (id,token='0')  => dispatch => {
  let api = `https://api-marah.herokuapp.com/story/${id}`;
  if(token.length> 2){
    return superagent.get(api)
      .set('Content-Type', 'application/json' )
      .set('Authorization',`Bearer ${token}`)
      .then(data => {
        // (console.log('getRemoteProduct DATA -------->',data ));
        dispatch( getStory(data.body));
      });}
  else{return superagent.get(api)
    .set('Content-Type', 'application/json' )
    .then(data => {
    //   (console.log('getRemoteProduct DATA -------->',data ));
      dispatch( getStory(data.body));
    });}
};


export const getStory = (payload) => {
  return {
    type: 'SELECTED',
    payload: payload,
  };
};


export const addComment = ( id , token , comment ) => dispatch => {
  // console.log('ADD COMMENT ACTION --->', id , token , comment );
  let api = `https://api-marah.herokuapp.com/addToStory/${id}`;
  const options = {
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' ,'Authorization': `Bearer ${token}`},
    cache: 'no-cache',
  };
  axios.post(api,comment,options)
    .then(data => {
      // console.log('comment ------>',data.data );
      dispatch(addCommentAction( data.data ));
    });
};

export const addCommentAction = (payload) => {
  return {
    type: 'ADD COMMENT',
    payload: payload,
  };
};


 
