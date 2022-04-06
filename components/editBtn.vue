<template>
  <v-btn icon class="mr-5" @click="editTaskName">
    <v-icon class="mx-auto">mdi-pencil</v-icon>
  </v-btn>
</template>

<script>
export default {
  methods: {
    editTaskName() {
      this.$emit('editTaskName')
    }
  },
};
</script>