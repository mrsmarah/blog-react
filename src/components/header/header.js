import React, { useState, useEffect }  from 'react';
import { NavLink ,Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar,Nav, NavItem ,NavDropdown } from 'react-bootstrap';
// import './header.scss';
import Auth from '../auth';
import Show from '../show';
import { connect } from 'react-redux';
// import * as actions2 from '../../store/reducers/profile';
import * as actions from '../../store/reducers/auth';

function Header(props) {
  
  return (
    <>
      <Navbar  expand="lg" className="header">
        <Navbar.Brand>
          <p className="neon">
            <Link to="/" className="aNeon">MY BLOG </Link></p></Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">


          <Nav className=" mr-auto">

            <Show condition={props.loggedIn}>
              <span className="pFonts togleSpan">{props.username }</span>
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
              <Auth capability="admin">
                <span>
                  <NavLink className="pFonts" to="/admin">Admin Page</NavLink>
                </span>
              </Auth>               
            </Show>

            <Show condition={props.loggedIn}>
              <span onClick={() =>{
                props.logout();
              }} >
                 logout
              </span>
            </Show>

          </Nav>

        </Navbar.Collapse>
      </Navbar>

    </>
  );

}

const mapStateToProps = (state) => {
  console.log('state------>', state);
  return {
    username: state.auth.user.username,
    loggedIn: state.auth.loggedIn,
    // user: state.profile.user,
  };
};
const mapDispatchToProps = (dispatch, getState) => ({
//   getUser: (username) => dispatch(actions2.getUser1(username)),
//   getPosts: (username) => dispatch(actions2.getPosts1(username)),
  logout: () => dispatch(actions.logout()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);

