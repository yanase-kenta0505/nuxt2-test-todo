import {
  getterTree,
  mutationTree,
  actionTree,
} from "typed-vuex";

interface TodosType {
  id: string;
  taskName: string;
  selected: boolean;
  done: boolean;
}
interface Item {
  id: string;
  newTaskName: string;
}

export const state = () => ({
  storeTodos: [] as TodosType[],
});

export const getters = getterTree(state, {
  getterTodos(state) {
    return state.storeTodos;
  },
});

export const mutations = mutationTree(state, {
  addTodo(state, newTodoItem: TodosType) {
    state.storeTodos.push(newTodoItem);
  },
  deleteTodos(state, index: number) {
    state.storeTodos.splice(index, 1);
  },
  changeTodoDone(state, id: string) {
    const changeItem = state.storeTodos.find((todo) => todo.id === id);
    if (changeItem === undefined) return;
    changeItem.done = !changeItem.done;
  },
  initTodos(state, initialTodos: TodosType[]) {
    state.storeTodos = initialTodos;
  },

  changeTaskName(state, item: Item) {
    const selectedIndex = state.storeTodos.findIndex(
      (todo) => todo.id === item.id
    );
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
});

export const actions = actionTree(
  { state, getters, mutations },
  {
    initTodos(context, initialTodos: TodosType[]): void {
      context.commit("initTodos", initialTodos);
    },
    addTodo(context, newTodoItem: TodosType): void {
      context.commit("addTodo", newTodoItem);
    },
    deleteTodos(context, index: number): void {
      context.commit("deleteTodos", index);
    },
    changeTodoDone(context, id: string): void {
      context.commit("changeTodoDone", id);
    },
    changeTaskName(context, item: Item): void {
      context.commit("changeTaskName", item);
    },
    allClear(context): void {
      context.commit("allClear");
    },
  }
);

