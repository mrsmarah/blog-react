import React, { useState,useEffect }  from 'react';
import { NavLink ,Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar,Nav } from 'react-bootstrap';
import Show from '../show';
import { connect } from 'react-redux';
import * as actions from '../../store/reducers/auth';

function Header(props) {

  return (
    <>
      <Navbar  expand="lg" className="header">
        <Navbar.Brand>
          <p className="neon">
            <Link to="/" className="aNeon">MY BLOG </Link></p></Navbar.Brand>

        <Nav className=" mr-auto">
          
          <Show condition={props.loggedIn}>
            <span className="pFonts togleSpan">{props.user}</span>
          </Show>

          <span >
            <NavLink className="pFonts" to="/"> Home</NavLink>
          </span>

          <Show condition={!props.loggedIn}>
            <span >
              <NavLink className="pFonts" to="/log" >Log In</NavLink>
            </span>
          </Show>

          <Show condition={props.loggedIn}>
            <span >
              <NavLink className="pFonts" to="/new" >new story</NavLink>
            </span>
          </Show>

          <Show condition={props.loggedIn}>
            <NavLink className="pFonts" to="/admin">Admin Page</NavLink>
          </Show>

          <Show condition={props.loggedIn}>
            <span 
              onClick={() =>{props.logout(); }} >
                 logout
            </span>
          </Show>

        </Nav>
      </Navbar>
    </>
  );

}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.loggedIn,
    user: state.auth.user,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch, getState) => ({
  logout: () => dispatch(actions.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

