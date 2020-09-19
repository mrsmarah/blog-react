import React, { useEffect } from 'react';
import './App.css';
import Header from './components/header/header.js';
// import Footer from './components/footer/footer.js';
import Main from './components/main/main.js';
import { connect } from 'react-redux';


const App = (props) => {

  useEffect(() => {
  
  }, []);

  return (
    <>
      <Header />
      <Main />
      {/* <Footer /> */} 
    </>
  );
};
const mapStateToProps = (state) => {
  return {
  
  };
};
const mapDispatchToProps = (dispatch, getState) => ({
 
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default App;