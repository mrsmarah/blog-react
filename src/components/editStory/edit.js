import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import Show from '../show';
import * as actions from '../../store/reducers/admin';
import {Form,Button} from 'react-bootstrap';


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

            <Form 
              style={{ width: '50rem', marginLeft: '30px' , marginTop: '20px' }}
              className='login formStyle zIndex' 
              onSubmit={handleSubmit} >
              <Form.Label> EDIT STORY </Form.Label>
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

              <Button style={{ marginTop: '20px'}} variant="primary" type="submit"> Update</Button>
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