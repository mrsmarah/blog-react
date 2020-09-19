import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Show from '../show';
import * as actions from '../../store/reducers/stories';
import Form from 'react-bootstrap/Form';


const NewStory = (props) => {
 
  const [story, setStory] = useState({});

  const handleChange = e => {
    setStory({ ...story, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await props.newStory(props.user , props.token, story);
  };

  return (
    <>
      <div className='back2'>
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
  return {
    loggedIn: state.auth.loggedIn,
    user: state.auth.user,
    blogs: state.blogs,
    token: state.auth.token,
  };
};


const mapDispatchToProps = (dispatch, getState) => ({
  newStory: (username, token, story) => dispatch(actions.newStory(username, token, story)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewStory);