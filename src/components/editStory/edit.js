import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import Show from '../show';
import * as actions from '../../store/reducers/admin';
import Form from 'react-bootstrap/Form';


const EditStory = (props) => {

  let { id } = useParams();

  const [story, setStory] = useState({});

  const handleChange = e => {
    setStory({ ...story, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await props.editAdmin(id , story , props.token);
  };

  return (
    <>
      <div className='back2'>
        <div id='addPost'>

          <Show condition={props.loggedIn}>

            <Form className='login formStyle zIndex' onSubmit={handleSubmit} >
              <label className='labelForm' >EDIT STORY</label>
              
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

              <button className='hvr-pulse' id='signInBt2' >Update</button>
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
  editAdmin: (id, token, story) => dispatch(actions.editAdmin(id, token, story)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditStory);