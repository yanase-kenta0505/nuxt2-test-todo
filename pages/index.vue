<template>
  <amplify-authenticator>
    <v-app>
      <title-area>
        <p class="text-h3 text-center ma-0">YANASE TODO LIST</p>
      </title-area>
      <add-task-field
        @reflection-taskname="newTaskName = $event"
        @all-clear="allClear"
        @add-todo="addTodo"
        :newTaskName="newTaskName"
      />
      <v-card class="mx-auto mt-10" width="600px" tile>
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
                <v-btn value="All">All</v-btn>
                <v-btn value="Active">Active</v-btn>
                <v-btn value="Completed">Completed</v-btn>
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
      <test-case />
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

import { useAccessor } from "../hooks.ts/useAccessor";

enum Status {
  All = "All",
  Active = "Active",
  Completed = "Completed",
}

interface TodosType {
  id: string;
  taskName: string;
  selected: boolean;
  done: boolean;
}

interface LocalTodos {
  todos: {
    storeTodos: TodosType[];
  };
}

export default defineComponent({
  setup() {
    const accessor = useAccessor();

    console.log(accessor);

    onMounted(() => {
      if (!JSON.parse(localStorage.getItem("LocalTodos") || "" || "null"))
        return;
      const localstrage = JSON.parse(
        localStorage.getItem("LocalTodos") || ""
      ) as LocalTodos;
      if (localstrage == null) return;
      if (!localstrage.todos.storeTodos) return;
      accessor.todos.initTodos(localstrage.todos.storeTodos);
    });

    const todos = ref<TodosType[]>([]);
    const toggleStatus = ref(Status.All);
    const newTaskName = ref("");

    const storeTodos = computed(() => accessor.todos.getterTodos);

    const filteredTodos = computed(() => {
      if (toggleStatus.value === Status.Active) {
        return todos.value.filter((todo) => todo.done === false);
      } else if (toggleStatus.value === Status.Completed) {
        return todos.value.filter((todo) => todo.done === true);
      } else return todos.value;
    });

    watch(
      storeTodos,
      () => {
        todos.value = JSON.parse(JSON.stringify(storeTodos.value));
      },
      { deep: true }
    );

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
