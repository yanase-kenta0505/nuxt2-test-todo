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
      :newTaskName="newTaskName"
    />

    <v-card class="mx-auto mt-10" width="600px" tile>
      <v-list dense flat>
        <v-subheader class="mb-3 d-flex justify-space-between">
          <div class="text-h6 blue--text ml-2">
            <p class="ma-0">{{ todos.length }} Items Left</p>
          </div>
          <div>
            <v-btn-toggle
              tile
              color="blue align-self-center"
              group
              v-model="toggleNum"
              mandatory
            >
              <v-btn value="left">All</v-btn>
              <v-btn value="center">Active</v-btn>
              <v-btn value="right">Completed</v-btn>
            </v-btn-toggle>
          </div>
        </v-subheader>
        <v-divider />
        <v-list-item-group v-for="(todo, index) in todos" :key="todo.taskName">
          <v-list-item class="pt-3 pb-3">
            <v-list-item-action>
              <v-checkbox v-model="todo.done"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-text-field
                id="taskName"
                autocomplete="off"
                hide-details="auto"
                maxlength="20"
                solo
                flat
                height="30px"
                :outlined="todo.selected"
                :disabled="!todo.selected"
                :value="todo.taskName"
                class="red--text"
                :class="[todo.done ? 'text-decoration-line-through' : '']"
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
      toggleNum: "left",
      newTaskName: "",
    };
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
      console.log(this.todos);
      this.todos[index].selected = !this.todos[index].selected;
    },
    changeTaskName(index, e) {
      this.todos[index].taskName = e.target.value;
      this.todos[index].selected = !this.todos[index].selected;
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