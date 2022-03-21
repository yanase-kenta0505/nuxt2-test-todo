<template>
  <v-app>
    <v-card width="600px" class="mx-auto mt-10" tile>
      <v-text-field
        v-model="newTaskName"
        @keydown.enter="addTodo"
        autofocus
        autocomplete="off"
        clearable
        color="primary"
        hide-details="auto"
        maxlength="20"
        placeholder="What needs to be done?"
        solo
        flat
        height="70px"
      ></v-text-field>
    </v-card>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      newTaskName: '',
    };
  },
  methods: {
    addTodo() {
      this.$emit('addTodo', {
        taskName: this.newTaskName,
        done: false
      })
      this.newTaskName = ""
    }
  }
}

</script>