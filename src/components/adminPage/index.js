import React, { useEffect } from 'react';
import { getAllAdmin } from '../../store/reducers/admin.js';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';



const Admin = (props) => {

  useEffect(() => {
    props.getAllAdmin(props.token);
  }, []);

  return (
    <>

      <h1> Admin Page </h1>
      <Table className='adminTable'>
        <thead>
          <tr>
            <th className='t-header'>User Name</th>
            <th className='t-header'>Blog Title</th>
            <th className='t-header'>Story Title</th>
            <th className='t-header'>Story Text</th>

            <th className='t-header'>EDIT</th>
          </tr>
        </thead>

        {props.adminStories.map((story, i ) => {

          return (
            <tbody key={i}>
              <tr>
                <th>{story.username}</th>
                <th>{story.blogTitle}</th>
                <th>{story.title}</th>
                <th>{story.text}</th>

                <th><Link to={`/status/${story._id}`}>Edit this story</Link></th>
              </tr>
            </tbody>
          );
        })}
      </Table>
    </>
  );
};


const mapStateToProps = (state) => {
  return {
    adminStories: state.admin.adminPage,
    token: state.auth.token,
  };
};


const mapDispatchToProps = (dispatch, getState) => ({
  getAllAdmin: (token) => dispatch(getAllAdmin(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Admin);

