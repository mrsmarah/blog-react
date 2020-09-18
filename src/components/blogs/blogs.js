import React from 'react';
import { connect } from 'react-redux';
import { getBlogs ,handelBlog } from '../../store/reducers/blogs';
import { getStoriesBlog } from '../../store/reducers/stories';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import {Carousel} from 'react-bootstrap';

const Blogs = (props) => {
  useEffect(() => {
    props.getBlogs();
  }, []);

  return(
    <>
      <section> 
        <ul>
          {props.blogs.map((blog , i) => {
            return(
              <li  key={i} onClick={() =>{
                props.handelBlog(blog.blogTitle);
                props.getStoriesBlog(blog.blogTitle);
              }}>
                <Link to={`/stories/${blog.blogTitle}`}> {blog.blogTitle}</Link>
              </li>
            );
          })}
        </ul>
      </section>
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
