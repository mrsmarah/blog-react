import superagent from 'superagent';

const initialState = {
  blogs: [],
  activeBlog: '',  
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
     
  case 'UPDATE ACTIVE BLOG':
    console.log('PAYLOAD ACTIVE', payload );
    return { ...state, activeBlog: payload };
    
  case 'GET BLOGS':
    return { ...state, blogs: payload.results };
    
  default:
    return state;
  }
};

const api = 'https://api-marah.herokuapp.com/blogs';

export const getBlogs = function () {
  return (dispatch) => {
    return superagent
      .get(api)
      .then((response) => {
        // console.log('get api response:', response.body);
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
