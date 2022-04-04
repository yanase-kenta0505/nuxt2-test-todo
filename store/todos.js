export const state = () => ({
  todos: [],
});
export const getters = {
  todos(state) {
    return state.todos;
  },
};
export const actions = {
  initTodos(context, initialTodos) {
    context.commit("initTodos", initialTodos);
  },
  addTodo(context, newTodoItem) {
    context.commit("addTodo", newTodoItem);
  },
  deleteTodos(context, index) {
    context.commit("deleteTodos", index);
  },
  changeTodoDone(context, id) {
    context.commit("changeTodoDone", id);
  },
  changeTaskName(context, item) {
    context.commit("changeTaskName", item);
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
  initTodos(state, initialTodos) {
    state.todos = initialTodos;
  },
  changeTaskName(state, item) {
    const selectedTodo = state.todos.find((todo) => todo.id === item.id);
    const selectedIndex = state.todos.findIndex((todo) => todo.id === item.id);

    if (item.newTaskName === "") {
      state.todos.splice(selectedIndex, 1);
    } else {
      state.todos[selectedIndex].taskName = item.newTaskName;
      state.todos[selectedIndex].selected = false;
    }
  },
};
