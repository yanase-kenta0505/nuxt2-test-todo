<template>
  <v-app>
    <v-btn icon class="mr-5" @click="editTaskName">
      <v-icon class="mx-auto">mdi-pencil</v-icon>
    </v-btn>
  </v-app>
</template>

<script>
export default {
  
  methods: {
    editTaskName(){
      this.$emit('editTaskName')
    }
  },
};
</script>