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
  changeTodoDone(context, id) {
    context.commit("changeTodoDone", id);
  },
};
export const mutations = {
  addTodo(state, newTodoItem) {
    state.todos.push(newTodoItem);
  },
  deleteTodos(state, index) {
    state.todos.splice(index, 1);
  },
  changeTodoDone(state, id) {
    // state.todos[index].done = !state.todos[index].done;
    const changeItem = state.todos.find((todo) => todo.id === id);
    changeItem.done = !changeItem.done;
  },
};
