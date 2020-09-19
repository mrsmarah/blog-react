import superagent from 'superagent';
const api = 'https://api-marah.herokuapp.com/blogs';

// STATE
const initialState = {
  blogs: [],
  activeBlog: '',  
};

// REDUCER
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
     
  case 'UPDATE ACTIVE BLOG':
    return { ...state, activeBlog: payload };
    
  case 'GET BLOGS':
    return { ...state, blogs: payload.results };
    
  default:
    return state;
  }
};

// ACTIONS
export const getBlogs = function () {
  return (dispatch) => {
    return superagent
      .get(api)
      .then((response) => {
        dispatch(blogsAction({ results: response.body }));
      });
  };
};

export const handelBlog = (response ) => ({
  type: 'UPDATE ACTIVE BLOG',
  payload: response,
});
    

export const blogsAction = (response) => ({
  type: 'GET BLOGS',
  payload: response,
});
