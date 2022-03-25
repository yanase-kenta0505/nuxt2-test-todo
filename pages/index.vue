<template>
  <v-app>
    <Title>
      <template #yanase>
        <p class="text-h3 text-center ma-0">YANASE's TODO LIST</p>
      </template>
    </Title>
    <AddTaskField
      @reflectionTaskName="reflectionTaskName"
      @addTodo="addTodo"
      @allClear="allClear"
      :newTaskName="newTaskName"
    />

    <v-card class="mx-auto mt-10" width="600px" tile>
      <v-list dense flat>
        <v-subheader class="mb-3 d-flex justify-space-between">
          <div class="text-h6 blue--text ml-2">
            <p class="ma-0">{{ todos | findDoneItemLength }} Items Left</p>
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
          :key="todo.taskName"
        >
          <v-list-item class="pt-3 pb-3">
            <v-list-item-action>
              <v-checkbox
                v-model="todo.done"
                :disabled="todo.selected"
              ></v-checkbox>
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
                @blur="changeTaskName(index, $event)"
                @keydown.enter="changeTaskName(index, $event)"
              />
            </v-list-item-content>
            <v-list-item-icon>
              <EditBtn @editTaskName="editTaskName(index)" />
              <DeleteBtn @deleteItem="deleteItem(index)" />
            </v-list-item-icon>
          </v-list-item>
          <v-divider />
        </v-list-item-group>
      </v-list>
    </v-card>
  </v-app>
</template>

<script >
import AddTaskField from "../components/addTaskField.vue";
import DeleteBtn from "../components/deleteBtn.vue";
import EditBtn from "../components/editBtn.vue";
import Title from "../components/title.vue";

export default {
  components: { AddTaskField, DeleteBtn, EditBtn, Title },

  data() {
    return {
      todos: [],
      toggleStatus: "All",
      newTaskName: "",
    };
  },

  computed: {
    filteredTodos() {
      if (this.toggleStatus === "Active") {
        return this.todos.filter((todo) => todo.done === false);
      } else if (this.toggleStatus === "Completed") {
        return this.todos.filter((todo) => todo.done === true);
      } else return this.todos;
    },
  },
  filters: {
    findDoneItemLength(todos) {
      const findDoneItem = todos.filter((todo) => !todo.done);
      return findDoneItem.length;
    },
  },

  methods: {
    reflectionTaskName(e) {
      this.newTaskName = e;
    },
    addTodo(newTask) {
      if (newTask.taskName === "") return;
      this.todos.push(newTask);
      this.newTaskName = "";
    },
    deleteItem(index) {
      this.todos.splice(index, 1);
    },
    editTaskName(index) {
      if (this.todos[index].done) return;
      this.todos[index].selected = !this.todos[index].selected;
    },
    changeTaskName(index, e) {
      if (e.target.value === "") {
        this.todos.splice(index, 1);
      } else {
        this.todos[index].taskName = e.target.value;
        this.todos[index].selected = !this.todos[index].selected;
      }
    },
    allClear() {
      const newTodos = this.todos.filter((todo) => !todo.done);
      this.todos = newTodos;
    },
  },
};
</script>

<style  scoped>
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
</style>