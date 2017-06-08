import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { addTodo } from './reducer';
import { isPromise } from './utils';

const logger1 = store => next => action => {
  console.log(next);
  console.log('start logger1', action);
  next(action);
  console.log('end logger1', action);
}

const logger2 = store => next => action => {
  console.log(next);
  console.log('start logger2', action);
  next(action);
  console.log('end logger2', action);
}

const reduxThunk = store => next => action => {
  if (typeof action === 'function') {
    console.log('thunk');
    return action(store.dispatch);
  }
  return next(action);
}

const reduxPromise = store => next => action => {
  return isPromise(action)
    ? action.then(store.dispatch)
    : next(action);
}

const store = createStore(addTodo, [], applyMiddleware(reduxPromise, reduxThunk, logger1, logger2));
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
