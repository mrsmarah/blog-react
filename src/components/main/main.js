import React, { useEffect } from 'react';
import { Route, useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import Blogs from '../blogs/blogs.js';
import Stories from '../stories/stories.js';
import OneStory from '../oneStory/oneStory.js';
import NewStory from '../newStory/newStory.js';
import Login from '../login';
import Admin from '../adminPage';
import EditStory from '../editStory/edit.js';


const Main = (props) => {

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

      <Route exact path="/new">
        <NewStory />
      </Route>

      <Route exact path="/admin">
        <Admin />
      </Route>

      <Route exact path="/status/:id">
        <EditStory />
      </Route>

    </>
  );
};

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch, getState) => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);