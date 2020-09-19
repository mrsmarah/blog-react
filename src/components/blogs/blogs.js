import React from 'react';
import { connect } from 'react-redux';
import { getBlogs ,handelBlog } from '../../store/reducers/blogs';
import { getStoriesBlog } from '../../store/reducers/stories';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import {Card,ListGroup } from 'react-bootstrap';


const Blogs = (props) => {
  
  useEffect(() => {
    props.getBlogs();
  }, []);

  return(
    <>
      <Card style={{ width: '50rem', marginLeft: '30px' , marginTop: '20px'}}>
        <ListGroup variant="flush">
          {props.blogs.map((blog , i) => {
            return(
              <ListGroup.Item key={i} onClick={() =>{
                props.handelBlog(blog.blogTitle);
                props.getStoriesBlog(blog.blogTitle);
              }} >
                <Link to={`/stories/${blog.blogTitle}`}> {blog.blogTitle}</Link>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Card>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs.blogs,
    activeBlog: state.blogs.activeBlog,
  };
};

const mapDispatchToProps = (dispatch) => ({
  handelBlog: (blog) => dispatch(handelBlog(blog)),
  getStoriesBlog: (blog) => dispatch(getStoriesBlog(blog)),
  getBlogs: () => dispatch(getBlogs()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Blogs);
