import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import { getPromise } from './utils';

class App extends Component {

  render() {
    const { todoList, actions } = this.props;
    console.log(this.props);
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div onClick={() => {
          actions.addPromise()
          }}>aaa</div>
        <div>
          { todoList && todoList.map((item, index) => <div key={index}>{item}</div>) }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    todoList: state,
  }
}

const addAsync = function() {
  return (dispatch) => {
    setTimeout(() => {
      dispatch({ type: 'ADD_TODO', text: 'AsyncText' })
    }, 1000)
  }
}

const addSync = function() {
  return {
    type: 'ADD_TODO',
    text: 'SyncText',
  }
}

const addPromise = function() {
  return (dispatch) => {
    getPromise(1).then(() => {
    console.log('promise');
    dispatch({ type: 'ADD_TODO', text: 'PromiseText' })
    })
  }
}

function mapAction(state) {
  return {
    actions: bindActionCreators({
      addAsync,
      addSync,
      addPromise,
    }, state)
  }
}

export default connect(mapStateToProps, mapAction)(App);
