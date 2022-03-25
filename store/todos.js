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
};
export const mutations = {
  addTodo(state, newTodoItem) {
    state.todos.push(newTodoItem);
  },
};
