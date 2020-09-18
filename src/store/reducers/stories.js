import superagent from 'superagent';

const initialState = {
  stories : [],
};

export default (state = initialState ,action) =>{
  const { type , payload } = action;
  switch(type){

  case 'SHOW BLOG STORIES':
    console.log( type, payload);
    return { ...state, stories : payload };

  default:
    return state;
  }
};


export const getStoriesBlog = (blog) => dispatch => {
  let api = `https://api-marah.herokuapp.com/stories/${blog}`;
  return superagent.get(api)
    .then(data => {
      console.log('dataaaaaaaaaaaaaaaaaaa',data)
      dispatch(handelStories( data.body ));
    });
};

export const handelStories = (payload) =>{
  return{
    type: 'SHOW BLOG STORIES',
    payload: payload,
  };
};

