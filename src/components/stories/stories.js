import React from 'react';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Stories = (props) => {


  return(
    <>
      <h3> active blog :{props.activeBlog} </h3>
      <section> 
        <ul>
          {props.stories.map((story , i) => {
            return(
              <li  key={i} onClick={() =>{
                props.getOneStory(story._id);
              }} >
                <Link to={`/story/${story._id}`}> {story.title}</Link>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );

};

const mapStateToProps = (state) => {
  return {
    stories: state.stories.stories,
    activeBlog: state.blogs.activeBlog,

  };
};

const mapDispatchToProps = (dispatch) => ({
//   getStoriesBlog: (blog) => dispatch(getStoriesBlog(blog)),

});

export default connect(mapStateToProps, mapDispatchToProps)(Stories);
