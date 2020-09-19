import React from 'react';
import { connect } from 'react-redux';
import { addComment } from '../../store/reducers/oneStory';
import { useState } from 'react';
import {Card ,Form,Button,ListGroup,ListGroupItem} from 'react-bootstrap';


const OneStory = (props) => {

  const [comment, setComment] = useState({});

  const handleChange = e => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async e => {
    e.preventDefault();
    e.target.reset();
    await props.addComment(props.oneStory._id , props.token , comment);
  };


  return(
    <>
      <Card style={{ width: '50rem', marginLeft: '30px' , marginTop: '20px' }}>
        <Card.Body>
          <Card.Title>{props.oneStory.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">BLOG : {props.oneStory.blogTitle}</Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">BY :{props.oneStory.username}</Card.Subtitle>
          <Card.Text>{props.oneStory.text}</Card.Text>
        </Card.Body>

        <ListGroup className="list-group-flush">
          {props.oneStory.comment.map((comment , j) =>{
            return(
              <ListGroupItem key={j} >{comment.username} : {comment.theComment}</ListGroupItem>
            );
          })}
        </ListGroup>
      </Card>

      <Form style={{ width: '50rem', marginLeft: '30px' , marginTop: '20px'}} onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Control 
            type="text" 
            placeholder="Add your comment..."
            onChange={handleChange}
            name="theComment"/>
        </Form.Group>
        <Button variant="primary" type="submit">Add</Button>
      </Form>
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

export default connect(mapStateToProps, mapDispatchToProps)(OneStory);

