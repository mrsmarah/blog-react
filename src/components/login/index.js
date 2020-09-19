import React, { useState } from 'react';
import * as actions from '../../store/reducers/auth';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Show from '../show';
import Form from 'react-bootstrap/Form';
import Signup from '../signup';

const Login = (props) => {
  const state = {
    username: '',
    password: '',
  };

  const [signup, setSignup] = useState(false);
  const [redirect, setRedirect] = useState(false);


  const handleChange = e => {
    state[e.target.name] = e.target.value;
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.login(state.username, state.password);
    setRedirect(true);
  };

  return (
    <>
      <Show condition={props.loggedIn} >
        {(redirect === true) ? <Redirect to='/' /> : null}
      </Show>

      <div className='back'>
        
        <div className='sign'>

          <Show condition={!props.loggedIn && !signup}>
            <form className='login' onSubmit={handleSubmit}  >
              <label className='labelForm pFonts'>SIGN IN</label>
              <Form.Control
                placeholder="User Name"
                name="username"
                id='username'
                className='pFonts borderBu '
                type='text'
                onChange={handleChange}>
              </Form.Control>
              <Form.Control
                placeholder="Password"
                name="password"
                id='password'
                className='pFonts borderBu'
                type='password'
                onChange={handleChange}>
              </Form.Control>
              <button id='signInBt'>SIGN IN</button>
              <p className='newUser pFonts' >New User ? <Link onClick={() => { setSignup(true); }}  >Register </Link></p>
            </form>
          </Show>

          <Show condition={!props.loggedIn && signup}>
            <Signup />
            <Link id='goBackBtn ' className="btn pulse backsize" onClick={() => { setSignup(false); }}  > Go Back </Link>
          </Show>
        </div>
      </div>

    </>
  );


};
const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.loggedIn,
  };
};

const mapDispatchToProps = (dispatch, getState) => ({
  login: (username, password) => dispatch(actions.login(username, password)),
  logout: () => dispatch(actions.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

