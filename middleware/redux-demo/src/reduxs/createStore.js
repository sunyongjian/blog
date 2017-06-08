
const createStore = (reducer) => {

  let state;
  const listeners = [];

  const getState = () => state;

  function subscribe(listener) {
    if (typeof listener === 'function') {
      listeners.push(listener);
    }
    return function() {
      listeners.filter(l => l !== listener);
    }
  }

  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach(l => l());
  }

  dispatch({ type: 'INIT' });
  return {
    getState,
    subscribe,
    dispatch,
  }
}
export default createStore;
