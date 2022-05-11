export const state = () => ({
  storeTodos: [],
});
export const getters = {
  storeTodos(state) {
    return state.storeTodos;
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
  allClear(context) {
    context.commit("allClear");
  },
};
export const mutations = {
  addTodo(state, newTodoItem) {
    state.storeTodos.push(newTodoItem);
  },
  deleteTodos(state, index) {
    state.storeTodos.splice(index, 1);
  },
  changeTodoDone(state, id) {
    // state.todos[index].done = !state.todos[index].done;
    const changeItem = state.storeTodos.find((todo) => todo.id === id);
    changeItem.done = !changeItem.done;
  },
  initTodos(state, initialTodos) {
    state.storeTodos = initialTodos;
  },
  changeTaskName(state, item) {
    const selectedIndex = state.storeTodos.findIndex((todo) => todo.id === item.id);

    if (item.newTaskName === "") {
      state.storeTodos.splice(selectedIndex, 1);
    } else {
      state.storeTodos[selectedIndex].taskName = item.newTaskName;
      state.storeTodos[selectedIndex].selected = false;
    }
  },
  allClear(state) {
    const newTodos = state.storeTodos.filter((todo) => todo.done === false);
    state.storeTodos = newTodos;
  },
};
