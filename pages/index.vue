<template>
  <amplify-authenticator>
    <v-app>
      <title-area>
        <template #yanase>
          <p class="text-h3 text-center ma-0">YANASE's TODO LIST</p>
        </template>
      </title-area>
      <add-task-field @reflectionTaskName="reflectionTaskName" @all-clear="allClear" @addTodo="addTodo"
        :newTaskName="newTaskName" />

      <v-card class="mx-auto mt-10" width="600px" tile>
        <v-list dense flat>
          <v-subheader class="mb-3 d-flex justify-space-between">
            <div class="text-h6 blue--text ml-2">
              <p class="ma-0">{{ todos | findDoneItemLength }} Items Left</p>
            </div>
            <div>
              <v-btn-toggle tile color="blue align-self-center" group v-model="toggleStatus" mandatory>
                <v-btn value="All">All</v-btn>
                <v-btn value="Active">Active</v-btn>
                <v-btn value="Completed">Completed</v-btn>
              </v-btn-toggle>
            </div>
          </v-subheader>
          <v-divider />

          <v-list-item-group v-for="(todo, index) in filteredTodos" :key="todo.id">
            <v-list-item class="pt-3 pb-3">
              <v-list-item-action>
                <v-checkbox :input-value="todo.done" :disabled="todo.selected" @click="changeTodoDone(todo.id)" />
              </v-list-item-action>
              <v-list-item-content :class="[todo.done ? 'text-decoration-line-through' : '']">
                <v-text-field id="taskName" autocomplete="off" hide-details="auto" maxlength="20" solo flat
                  height="30px" :outlined="todo.selected && !todo.done" :disabled="!todo.selected || todo.done"
                  :value="todo.taskName" class="red--text" @blur="changeTaskName(todo.id, $event)"
                  @keydown.enter="changeTaskName(todo.id, $event)" />
              </v-list-item-content>
              <v-list-item-icon>
                <edit-btn @editTaskName="editTaskName(index)" />
                <delete-btn @deleteItem="deleteItem(index)" />
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

<script >
export default {
  data() {
    return {
      todos: [],
      toggleStatus: "All",
      newTaskName: "",
    };
  },

  computed: {
    storeTodos() {
      //以下の方法だとオブジェクト内のプロパティの変更を検知してくれない
      // const todos = JSON.parse(
      //   JSON.stringify(this.$store.getters["todos/todos"])
      // );
      // return todos;
      return this.$store.getters["todos/todos"];
    },

    filteredTodos() {
      if (this.toggleStatus === "Active") {
        return this.todos.filter((todo) => todo.done === false);
      } else if (this.toggleStatus === "Completed") {
        return this.todos.filter((todo) => todo.done === true);
      } else return this.todos;
    },
  },

  watch: {
    storeTodos: {
      handler() {
        this.todos = JSON.parse(JSON.stringify(this.storeTodos));
      },
      deep: true,
    },
  },

  filters: {
    findDoneItemLength(todos) {
      const findDoneItem = todos.filter((todo) => !todo.done);
      return findDoneItem.length;
    },
  },

  mounted() {
    if (!JSON.parse(localStorage.getItem('todos'))) return
    const localstrage = JSON.parse(localStorage.getItem('todos'))
    if (!localstrage.todos.todos) return
    this.$store.dispatch("todos/initTodos", localstrage.todos.todos);
  },

  methods: {
    changeTodoDone(id) {
      this.$store.dispatch("todos/changeTodoDone", id);
    },
    reflectionTaskName(e) {
      this.newTaskName = e;
    },
    addTodo(newTask) {
      if (newTask.taskName === "") return;
      this.$store.dispatch("todos/addTodo", newTask);
      this.newTaskName = "";
    },
    deleteItem(index) {
      // this.todos.splice(index, 1);
      this.$store.dispatch("todos/deleteTodos", index);
    },
    editTaskName(index) {
      if (this.todos[index].done) return;
      this.todos[index].selected = !this.todos[index].selected;
    },
    changeTaskName(id, e) {
      this.$store.dispatch('todos/changeTaskName', {
        id: id,
        newTaskName: e.target.value
      });

    },
    allClear() {
      // const newTodos = this.todos.filter((todo) => !todo.done);
      // this.todos = newTodos;
      this.$store.dispatch('todos/allClear');
    },
  },
};
</script>

<style  scoped>
::v-deep .v-application--wrap {
  min-height: initial;
}

::v-deep .v-text-field>.v-input__control>.v-input__slot:before {
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
</style>