import React from 'react';
import { connect } from 'react-redux';
import { addComment } from '../../store/reducers/oneStory';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';

const Stories = (props) => {

  const [comment, setComment] = useState({});

  const handleChange = e => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async e => {
    e.preventDefault();
    e.target.reset();
    // console.log('SUBMIT COMMENTTTTT', props.oneStory._id , props.token , comment);
    await props.addComment(props.oneStory._id , props.token , comment);
  };

  return(
    <>
      <p>username : {props.oneStory.username}</p>
      <p>blogTitle : {props.oneStory.blogTitle}</p>
      <p>story title : {props.oneStory.title}</p>
      <p>story text : {props.oneStory.text}</p>

      <div>story comments : 
        {props.oneStory.comment.map((comment , j) =>{
          return(
            <li  key={j} >
              <p> username : {comment.username}</p>
              <p> comment : {comment.theComment}</p>
            </li>
          );
        })}
      </div>

      <form className='form-block' onSubmit={handleSubmit} >
        <div id='commentText' className='col-xs-12'>
          <div >
            <TextField
              label=" Add your content ..."
              name="theComment"
              onChange={handleChange}
              id='comment'
              className='borderBu'
            >
            </TextField>
          </div>
        </div>
        <button id='addComment' className="hoverBtn" >Add</button>
  
      </form>
    </>
  );

};

const mapStateToProps = (state) => {
  return {
    oneStory : state.oneStory.oneStory,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addComment: ( id, token , comment) => dispatch(addComment( id, token , comment)),

});

export default connect(mapStateToProps, mapDispatchToProps)(Stories);
