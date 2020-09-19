import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, Link, Redirect } from 'react-router-dom';
import Show from '../show';
import * as actions from '../../store/reducers/stories';
// import { getRemoteProduct } from '../../store/reducers/post';
import Form from 'react-bootstrap/Form';
// import './addPost.css';
// import './hover.css';
// import Upload from '../upload';


const NewStory = (props) => {

  //   let { id } = useParams();
  // let redirectToReferrer = false ;

  //   const [redirect, setRedirect] = useState(false);
  const [story, setStory] = useState({});


  //   useEffect(() => {
  //     if (props.mode === 'edit') {
  //       let currentPost = props.posts.filter(post => post._id === id);
  //       setPost(currentPost[0] || {});
  //     }
  //   }, []);


  //   useEffect(() => {

  //     setPost({ ...post, images: props.images });
  //   }, [props.images]);


  const handleChange = e => {
    setStory({ ...story, [e.target.name]: e.target.value });
    //   state[e.target.name]=e.target.value ;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    // setRedirect(true);
    // alert('New Post added !');
    // console.log('submit post ', props.user.username, props.token , story);

    if (props.mode !== 'edit') {
      console.log('ADDING ....');
      await props.newStory(props.user , props.token, story);
    } else {
      console.log('UPDATING ....');
    //   props.updatePost(id, props.token, post);
    }
  };

  return (
    <>
      <div className='back2'>
        {/* {(redirect === true) ? <Redirect to={`/user/${props.username}`} /> : null} */}
        {/* {console.log(' props.USERNAME', props.username)} */}
        {/* {console.log(' props.USER', props.user)} */}
        {/* {console.log('add post before render -----> ', story)} */}
        <div id='addPost'>

          <Show condition={props.loggedIn}>

            <Form className='login formStyle zIndex' onSubmit={handleSubmit} >
              <label className='labelForm' >ADD STORY</label>
              <Form.Control
                placeholder='Title'
                name='title'
                type='text'
                onChange={handleChange}
                value={story.title || ''}
                className='borderBu'
              />

              <Form.Control as="textarea" rows="3" 
                placeholder='Text' 
                name="text"
                onChange={handleChange}
                value={story.text}
                className='borderBu' />

              <select class="custom-select" id="inputGroupSelect01" 
                name="blogTitle" 
                onChange={handleChange}
                value={story.blogTitle}>
                <option selected>Blog Title</option>
                {props.blogs.blogs.map(blog => {
                  return (
                    <option 
                      value={blog.blogTitle}>
                      {blog.blogTitle}
                    </option>
                  );
                })}
              </select>

              <Show condition={props.mode !== 'edit'}>
                <button className='hvr-pulse' id='signInBt2' >ADD</button>
              </Show>

              <Show condition={props.mode === 'edit'}>
                <button >update</button>
              </Show>

            </Form>
          </Show>

        </div>

      </div>

    </>
  );


};

const mapStateToProps = (state) => {
//   console.log('state------>', state);
  return {
    loggedIn: state.auth.loggedIn,
    user: state.auth.user,
    blogs: state.blogs,
    token: state.auth.token,
    // posts: state.profile.posts,
    username: state.auth.user.username,
  };
};


const mapDispatchToProps = (dispatch, getState) => ({
  newStory: (username, token, story) => dispatch(actions.newStory(username, token, story)),
//   getRemoteProduct: (id, token) => dispatch(getRemoteProduct(id, token)),
//   updatePost: (id, token, post) => dispatch(actions.updatePost(id, token, post)),
});
export default connect(mapStateToProps, mapDispatchToProps)(NewStory);