import React, { useEffect } from 'react';
import { Route, useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import Blogs from '../blogs/blogs.js';
import Stories from '../stories/stories.js';
import OneStory from '../oneStory/oneStory.js';
// import AddStory from '../addStory/addStory.js';
// import Admin from '../adminPage';
import Login from '../login';
// import Auth from '../auth';

import * as actions from '../../store/reducers/auth';
import { getBlogs } from '../../store/reducers/blogs';


const Main = (props) => {

  // props.load();

  // useEffect(() => {
  //   props.getBlogs();
  // }, []);

  return (
    <>
      <Route exact path="/">
        <Blogs />
      </Route>

      <Route exact path="/stories/:blog" >
        <Stories />
      </Route>

      <Route exact path="/story/:id">
        <OneStory />
      </Route>

      <Route exact path="/log">
        <Login />
      </Route>

      {/* <Route exact path="/new">
        <AddStory />
      </Route> */}

      {/* <Route exact path="/admin">
        <Auth capability='admin'>
          <Admin />
        </Auth>
      </Route> */}

      {/* <Route exact path="/status/:id">
        <Auth capability='admin'>
          <OneStory show='admin' />
        </Auth>
      </Route> */}

    </>
  );
};

const mapStateToProps = (state) => {
  return {
    // products: state.products.products,
  };
};

const mapDispatchToProps = (dispatch, getState) => ({
  load: () => dispatch(actions.load()),
  getBlogs: () => dispatch(getBlogs()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);