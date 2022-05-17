<template>
  <amplify-authenticator>
    <v-app>
      <title-area>
        <!-- scoped slotを使用して子コンポーネントのデータを受け取るÏ -->
        <template #owner="{ ownerName, message }">
          <h2 class="text-center">
            HELLO {{ ownerName.firstName }}
            {{ ownerName.lastName }}
            <br />
            {{ message }}
          </h2>
        </template>
        <!-- scoped slotを使用して親コンポーネントのボタンから子コンポーネントのonメソッドを発火する -->
        <template #activator="{ on }">
          <v-btn class="mt-5 ml-5" @click="on">表示切替</v-btn>
        </template>
      </title-area>

      <add-task-field
        @all-clear="allClear"
        @add-todo="addTodo"
        v-model="newTaskName"
      />
      <v-card class="mx-auto mt-10" width="600" tile>
        <v-list dense flat>
          <v-subheader class="mb-3 d-flex justify-space-between">
            <div class="text-h6 blue--text ml-2">
              <p class="ma-0">{{ findDoneItemLength }} Items Left</p>
            </div>
            <div>
              <v-btn-toggle
                tile
                color="blue align-self-center"
                group
                v-model="toggleStatus"
                mandatory
              >
                <v-btn :value="Status.All">All</v-btn>
                <v-btn :value="Status.Active">Active</v-btn>
                <v-btn :value="Status.Completed">Completed</v-btn>
              </v-btn-toggle>
            </div>
          </v-subheader>
          <v-divider />
          <v-list-item-group
            v-for="(todo, index) in filteredTodos"
            :key="todo.id"
          >
            <v-list-item class="pt-3 pb-3">
              <v-list-item-action>
                <v-checkbox
                  :input-value="todo.done"
                  :disabled="todo.selected"
                  @click="changeTodoDone(todo.id)"
                />
              </v-list-item-action>
              <v-list-item-content
                :class="[todo.done ? 'text-decoration-line-through' : '']"
              >
                <v-text-field
                  id="taskName"
                  autocomplete="off"
                  hide-details="auto"
                  maxlength="20"
                  solo
                  flat
                  height="30px"
                  :outlined="todo.selected && !todo.done"
                  :disabled="!todo.selected || todo.done"
                  :value="todo.taskName"
                  class="red--text"
                  @blur="changeTaskName(todo.id, $event)"
                  @keydown.enter="changeTaskName(todo.id, $event)"
                />
              </v-list-item-content>
              <v-list-item-icon>
                <edit-btn @edit-task-name="editTaskName(index)" />
                <delete-btn @delete-item="deleteItem(index)" />
              </v-list-item-icon>
            </v-list-item>
            <v-divider />
          </v-list-item-group>
        </v-list>
      </v-card>
      <v-card width="600px" class="mx-auto mt-5">
        <amplify-sign-out />
      </v-card>
    </v-app>
  </amplify-authenticator>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  onMounted,
  watch,
} from "@nuxtjs/composition-api";

import { useAccessor } from "~/hooks/useAccessor";

import { Status, TodosType, LocalTodos } from "~/type/TodosType";

export default defineComponent({
  setup() {
    const accessor = useAccessor();

    /*
    * TODO: localStorageから復元したタスクを画面に表示する
    * このブロックは、自動的にvuex-persistedstateが読み込むので、不要になります。
    * ただし、現在は動作していないので、理由を考えて、全体的に修正してください。
    * ヒント：vuex-persistedstateがstateを復元したときにはwatch(storeTodos, () => {...})は反応しない
    */
    //アプリ起動時にlocalstorageにタスクがあれば画面に表示する
    // onMounted(() => {
    //   if (!JSON.parse(localStorage.getItem("LocalTodos") || "")) return;
    //   const localstrage = JSON.parse(
    //     localStorage.getItem("LocalTodos") || ""
    //   ) as LocalTodos;
    //   if (localstrage == null) return;
    //   if (!localstrage.todos.storeTodos) return;
    //   accessor.todos.initTodos(localstrage.todos.storeTodos);
    // });

    //v-text-fieldに入力された値が反映される
    const newTaskName = ref("");
    /*
     * TODO: このtodos変数を廃止する。
     * todos変数は、TodosType[]の型をしているけれども、実際には.selectedをref化したいだけ。
     * それ以外の値はstoreの値を使っているので、別にコピーを取ってくる必要はない。
     * それならば、素直にselectedだけref化して編集状態を管理した方が良いよね。
     */
    const todos = ref<TodosType[]>([]);
    const toggleStatus = ref(Status.All);
    const storeTodos = computed(() => accessor.todos.getterTodos);

    //絞り込みのボタンが押されるたびに（toggleStatusの内容が変わるたびに）表示するタスクを変更
    const filteredTodos = computed(() => {
      switch (toggleStatus.value) {
        case Status.Active:
          return todos.value.filter((todo) => todo.done === false);
        case Status.Completed:
          return todos.value.filter((todo) => todo.done === true);
        case Status.All:
          return todos.value;
        default:
          // ここには来ない
      }
    });

    //storeのgetterTodosに変更（追加、削除など）があるたびに検知してtodosを変更する
    watch(
      storeTodos,
      (value) => { // watchでは、変更後の値を引数で受け取って、その値を使う（直接監視しているリアクティブ変数を読み出さない）
        console.log('storeTodosが変更されました', value)
        todos.value = JSON.parse(JSON.stringify(value));
      },
      //タスク（todo）の中のオブジェクト（done）などの変更も検知できるようにdeepをtrueにする
      { deep: true }
    );

    //完了していないタスクの個数を集計する
    const findDoneItemLength = computed(() => {
      const findDoneItem = todos.value.filter((todo) => !todo.done);
      return findDoneItem.length;
    });

    const changeTodoDone = (id: string) => {
      accessor.todos.changeTodoDone(id);
    };

    const addTodo = (newTask: TodosType) => {
      if (newTask.taskName === "") return;
      accessor.todos.addTodo(newTask);
      newTaskName.value = "";
    };

    const deleteItem = (index: number) => {
      accessor.todos.deleteTodos(index);
    };

    const editTaskName = (index: number) => {
      if (todos.value[index].done) return;
      todos.value[index].selected = !todos.value[index].selected;
    };

    const changeTaskName = (id: string, e: Event) => {
      if (e.target instanceof HTMLInputElement) {
        accessor.todos.changeTaskName({
          id: id,
          newTaskName: e.target.value,
        });
      }
    };

    const allClear = () => {
      accessor.todos.allClear();
    };

    return {
      todos,
      toggleStatus,
      newTaskName,
      storeTodos,
      filteredTodos,
      findDoneItemLength,
      changeTodoDone,
      addTodo,
      deleteItem,
      editTaskName,
      changeTaskName,
      allClear,
      Status,
    };
  },
});
</script>

<style scoped>
::v-deep .v-application--wrap {
  min-height: initial;
}

::v-deep .v-text-field > .v-input__control > .v-input__slot:before {
  border: none;
}

::v-deep .v-list {
  padding-bottom: 0 !important;
}

::v-deep .v-ripple__container {
  display: none !important;
}

::v-deep .v-input #taskName {
  font-size: 20px !important;
  color: blue !important;
}

.v-list-item__content {
  overflow: initial;
}
</style>
