import React from 'react';
import { NavLink ,Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar,Nav } from 'react-bootstrap';
import Show from '../show';
import { connect } from 'react-redux';
import * as actions from '../../store/reducers/auth';

function Header(props) {

  return (
    <>
      <Navbar bg="light" variant="light">
        <Navbar.Brand ><Link to="/" className="aNeon">MY BLOG </Link></Navbar.Brand>
        <Nav className="mr-auto">

          <Nav.Link><NavLink className="pFonts" to="/"> Home</NavLink></Nav.Link>

          <Nav.Link>
            <Show condition={!props.loggedIn}>
              <span >
                <NavLink className="pFonts" to="/log" >Log In</NavLink>
              </span>
            </Show>
          </Nav.Link>

          <Nav.Link>
            <Show condition={props.loggedIn}>
              <span >
                <NavLink className="pFonts" to="/new" >new story</NavLink>
              </span>
            </Show>
          </Nav.Link>

          <Nav.Link>
            <Show condition={props.loggedIn}>
              <NavLink className="pFonts" to="/admin">Admin Page</NavLink>
            </Show>
          </Nav.Link>

          <Nav.Link>
            <Show condition={props.loggedIn}>
              <span 
                onClick={() =>{props.logout(); }} >
                 logout
              </span>
            </Show>
          </Nav.Link>

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
