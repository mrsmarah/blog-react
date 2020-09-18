import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Show from '../show';
import * as actions from '../../store/reducers/auth';
import Form from 'react-bootstrap/Form';
// import './signup.css';

const SignUP = (props) => {
  const state = {
    username: '',
    password: '',
    role: '',
  };


  const handleChange = e => {
    console.log('signup---->', state);
    state[e.target.name] = e.target.value;
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.signup(state.username, state.password);
  };


  return (
    <>
      
      <Show condition={!props.loggedIn}>
        {/* <div className='flexRight'> */}
        <form className='login' onSubmit={handleSubmit}  >
          <label className='labelForm pFonts'>SIGN UP</label>
          <Form.Control
            placeholder="User Name"
            name="username"
            id='username'
            className='borderBu pFonts'

            onChange={handleChange}>
          </Form.Control>
          <Form.Control
            placeholder="Password"
            name="password"
            id='password'
            onChange={handleChange}
            className='borderBu pFonts'

          >
          </Form.Control>

          {/* <Form.Control
            placeholder="Role"
            name="role"
            onChange={handleChange}
            className='borderBu'
          >
          </Form.Control> */}

          <button id='signInBt'>SING UP</button>
        </form>

      </Show>

      <div id='fixFoter'></div>

    </>
  );


};

const mapStateToProps = (state) => {
  console.log('state------>', state);
  return {
    loggedIn: state.auth.loggedIn,
    // user: state.auth.user,
  };
};


const mapDispatchToProps = (dispatch, getState) => ({
  signup: (username, password) => dispatch(actions.signup(username, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUP);