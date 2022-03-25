<template>
  <v-app>
    <v-card width="600px" class="mx-auto mt-10 d-flex" tile>
      <AllClearBtn @allClear="allClear" class="align-self-center ml-2" />
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
  </v-app>
</template>

<script>
import AllClearBtn from "./allClearBtn.vue";
export default {
  components: { AllClearBtn },
  props: {
    newTaskName: {
      type: String,
    },
  },
  methods: {
    reflectionTaskName(e) {
      this.$emit("reflectionTaskName", e);
    },
    addTodo() {
      
      this.$emit("addTodo", {
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