import Immutable from 'immutable';
import { createReducer } from 'redux-immutablejs';

// Any imports not from node_modules have to be done relative to current path
// so that unit tests run correctly
import constants from '../constants';

let nextId = 10;

const initialState = Immutable.fromJS({
  todos: [],
});

export default createReducer(initialState, {

  [constants.TODO.ADD]: (state, { todo }) => {
    const newTodo = Immutable.fromJS({
      id: nextId++,
      isDone: false,
      text: todo,
    });

    state = state.updateIn([ 'todos' ], (array) => { return array.push(newTodo); });
    return state;
  },

  [constants.TODO.TOGGLE]: (state, { id }) => {
    const index = state.get('todos').findIndex((item) => {
      return item.get('id') === id;
    });

    if (index !== -1) {
      // Only update the state if the index was found
      state = state.updateIn([ 'todos', index, 'isDone' ], (isDone) => { return !isDone; });
    }

    return state;
  },

});
