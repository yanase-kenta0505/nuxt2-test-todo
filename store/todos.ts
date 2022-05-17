
// Vuexに型をつけるために使用
import { getterTree, mutationTree, actionTree } from "typed-vuex";


import { TodosType, Item } from "~/type/TodosType";

/*
 * TODO: このファイルを state.js, getters.js, mutations.js, actions.jsに分離する。
 */

export const state = () => ({
  storeTodos: [] as TodosType[],
});

export const getters = getterTree(state, {
  /*
  * TODO: このgetterはstateに直接アクセスすれば同じなので、消してもOK
  */
  getterTodos(state) {
    return state.storeTodos;
  },
});

/*
 * TODO: mutationsの命名ルールに従う。
 * stateに直接代入する場合: set〜
 * アクションがなくなる場合、もっとシンプルな命名にできる。
 */
export const mutations = mutationTree(state, {
  mutationAddTodo(state, newTodoItem: TodosType) {
    state.storeTodos.push(newTodoItem);
  },
  /*
   * TODO: 単複を統一する
   */
  mutationDeleteTodos(state, index: number) {
    state.storeTodos.splice(index, 1);
  },
  mutationChangeTodoDone(state, id: string) {
    const changeItem = state.storeTodos.find((todo) => todo.id === id);
    if (changeItem === undefined) return;
    changeItem.done = !changeItem.done;
  },
  mutationInitTodos(state, initialTodos: TodosType[]) {
    state.storeTodos = initialTodos;
  },

  mutationChangeTaskName(state, item: Item) {
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
  mutationAllClear(state) {
    const newTodos = state.storeTodos.filter((todo) => todo.done === false);
    state.storeTodos = newTodos;
  },
});

/*
 * TODO: ここのアクションは全てmutationを呼び出しているだけなので、全部削除する
 */
export const actions = actionTree(
  { state, getters, mutations },
  {
    initTodos(context, initialTodos: TodosType[]): void {
      context.commit("mutationInitTodos", initialTodos);
    },
    addTodo(context, newTodoItem: TodosType): void {
      context.commit("mutationAddTodo", newTodoItem);
    },
    deleteTodos(context, index: number): void {
      context.commit("mutationDeleteTodos", index);
    },
    changeTodoDone(context, id: string): void {
      context.commit("mutationChangeTodoDone", id);
    },
    changeTaskName(context, item: Item): void {
      context.commit("mutationChangeTaskName", item);
    },
    allClear(context): void {
      context.commit("mutationAllClear");
    },
  }
);
