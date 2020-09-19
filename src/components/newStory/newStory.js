import React, { useState } from 'react';
import { connect } from 'react-redux';
import Show from '../show';
import * as actions from '../../store/reducers/stories';
import {Form,Button} from 'react-bootstrap';


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

            <Form 
              style={{ width: '50rem', marginLeft: '30px' , marginTop: '20px' }}
              className='login formStyle zIndex' 
              onSubmit={handleSubmit} >
              <Form.Label> ADD STORY </Form.Label>
              <Form.Control
                style={{ marginBottom: '10px'}}
                placeholder='Title'
                name='title'
                type='text'
                onChange={handleChange}
                value={story.title || ''}
                className='borderBu'
              />
              <Form.Control as="textarea" rows="3" 
                style={{ marginBottom: '10px'}}
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

              <Button style={{ marginTop: '20px'}} variant="primary" type="submit"> ADD</Button>
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