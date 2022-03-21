<template>
  <v-app>
    <v-card width="600px" class="mx-auto mt-10 blue white--text" tile elevation="0">
      <p class="text-h3 text-center ma-0">TODO LIST</p>
    </v-card>

    <AddTaskField @addTodo="addTodo" />

    <v-card class="mx-auto mt-10" width="600px" tile>
      <v-list dense flat>
        <v-subheader class="mb-3 d-flex justify-space-between">
          <div class="text-h6 blue--text ml-2">
            <p class="ma-0" >{{ todos.length }} Items Left</p>
          </div>
          <div>
            <v-btn-toggle tile color="blue align-self-center" group v-model="toggleNum" mandatory>
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
              <v-checkbox></v-checkbox>
            </v-list-item-action>
            <v-list-item-content >
              <v-list-item-title  class="text-h6">{{ todo.taskName }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon>
              <v-btn icon class="mr-5">
                <v-icon class="mx-auto">mdi-pencil</v-icon>
              </v-btn>
              <DeleteBtn @deleteItem="deleteItem(index)" />
            </v-list-item-icon>
          </v-list-item>
          <v-divider />
        </v-list-item-group>
      </v-list>
    </v-card>
  </v-app>
</template>

<script>
import AddTaskField from "../components/addTaskField.vue";
import DeleteBtn from "../components/deleteBtn.vue";

export default {
  components: { AddTaskField, DeleteBtn },

  data() {
    return {
      todos: [],
      toggleNum: 'left'
    };
  },

  methods: {
    addTodo(newTask) {
      this.todos.push(newTask)
    },
    deleteItem(index) {
      this.todos.splice(index, 1)
    }
  }

}


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
</style>