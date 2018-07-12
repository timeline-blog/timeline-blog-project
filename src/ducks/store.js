import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';

import followsReducer from './reducers/followsReducer';
import previewsReducer from './reducers/previewsReducer';
import storyReducer from './reducers/storyReducer';
import userReducer from './reducers/userReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(promiseMiddleware()));

const combinedReducers = combineReducers({
  follows: followsReducer,
  previews: previewsReducer,
  story: storyReducer,
  user: userReducer
});

const store = createStore( combinedReducers, enhancer)


export default store;