import React , { useEffect }from 'react';
import * as actions from '../../store/reducers/auth';
import Show from '../show';
import { connect } from 'react-redux';

const Auth = (props) =>{
  useEffect(() => {
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  let okToRender = false;

  try {
    okToRender = props.loggedIn && (
      props.capability ?
        props.user.role.includes(props.capability)
        : true
    );
  } catch (e) {
    console.warn('Not Authorized!');
  }

  return (
    <Show condition={okToRender}>
      {props.children}
    </Show>
  );
 
};
const mapStateToProps = (state) => {
  console.log('state------>',state);
  return { 
    loggedIn: state.auth.loggedIn,
    user:  state.auth.user ,
  };
};
  
  
const mapDispatchToProps = (dispatch, getState) => ({
  load: () => dispatch(actions.load()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
