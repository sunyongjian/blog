const todoList = [];
export function addTodo(state = todoList, action) {
  console.log(state, action);
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.text];
      break;
    default:
      return state;
  }
}
