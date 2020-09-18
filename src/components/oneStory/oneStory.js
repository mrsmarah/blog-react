import React from 'react';
import { connect } from 'react-redux';
import { getOneStory } from '../../store/reducers/oneStory';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Stories = (props) => {
  return(
    <>
      <p>{props.oneStory.username}</p>
      <p>{props.oneStory.blogTitle}</p>
      <p>{props.oneStory.title}</p>
      <p>{props.oneStory.text}</p>
      <div>
        {props.oneStory.comment.map((comment , j) =>{
          return(
            <li  key={j} >{comment.theComment}</li>
          );
        })}
      </div>
      
    </>
  );

};

const mapStateToProps = (state) => {
  return {
    oneStory : state.oneStory,
  };
};

const mapDispatchToProps = (dispatch) => ({
//   getStoriesBlog: (blog) => dispatch(getStoriesBlog(blog)),

});

export default connect(mapStateToProps, mapDispatchToProps)(Stories);
