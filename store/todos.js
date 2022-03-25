export const state = () => ({
  todos: [],
});
export const getters = {
  todos(state) {
    return state.todos;
  },
};
export const actions = {
  addTodo(context, newTodoItem) {
    context.commit("addTodo", newTodoItem);
  },
  deleteTodos(context, index) {
    context.commit("deleteTodos", index);
  },
};
export const mutations = {
  addTodo(state, newTodoItem) {
    state.todos.push(newTodoItem);
  },
  deleteTodos(state, index) {
    state.todos.splice(index, 1);
  },
};
