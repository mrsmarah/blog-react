
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';


import auth from './reducers/auth';
import blogs from './reducers/blogs';
import stories from './reducers/stories';
import oneStory from './reducers/oneStory';



const reducers = combineReducers({  auth , blogs ,stories ,oneStory });

const store = () => {
  return createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
};

export default store();