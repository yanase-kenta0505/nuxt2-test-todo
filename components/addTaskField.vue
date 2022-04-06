<template>
  <v-card width="600px" class="mx-auto mt-10 d-flex" tile>
    <all-clear-btn @all-clear="allClear" class="align-self-center ml-2" />
    <v-text-field
      :value="newTaskName"
      @input="reflectionTaskName"
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
</template>

<script>
export default {
  props: {
    newTaskName: {
      type: String,
    },
  },
  watch: {
    storeId() {
      this.id = this.storeId
    }
  },
  methods: {
    reflectionTaskName(e) {
      this.$emit("reflectionTaskName", e);
    },
    addTodo() {
      this.$emit("addTodo", {
        id: new Date().getTime().toString(16),
        taskName: this.newTaskName,
        selected: false,
        done: false,
      });
    },
    allClear() {
      this.$emit("allClear");
    },
  },
};
</script>