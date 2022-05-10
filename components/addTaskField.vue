<template>
  <v-card width="600px" class="mx-auto mt-10 d-flex" tile>
    <all-clear-btn @all-clear="allClear" class="align-self-center ml-2" />
    <v-text-field :value="newTaskName" @input="$emit('reflection-taskname', $event)" @keydown.enter="addTodo" autofocus
      autocomplete="off" clearable color="primary" hide-details="auto" maxlength="20"
      placeholder="What needs to be done?" solo flat height="70px"></v-text-field>
  </v-card>
</template>

<script lang="ts">
// export default {
//   props: {
//     newTaskName: {
//       type: String,
//     },
//   },
//   watch: {
//     storeId() {
//       this.id = this.storeId
//     }
//   },
//   methods: {
//     addTodo() {
//       this.$emit("add-todo", {
//         id: new Date().getTime().toString(16),
//         taskName: this.newTaskName,
//         selected: false,
//         done: false,
//       });
//     },
//     allClear() {
//       this.$emit("all-clear");
//     },
//   },
// };

import { defineComponent } from "@nuxtjs/composition-api";

type props = {
  newTaskName:string

}

export default defineComponent({
  
  setup(){



    return{}
  }
})

</script>

<style>
.v-input__slot {
  width: 95% !important;
}
</style>