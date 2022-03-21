<template>
  <v-app>
    <v-btn icon @click="deleteItem">
      <v-icon class="mx-auto">mdi-delete</v-icon>
    </v-btn>
  </v-app>
</template>

<script>
export default {
  methods:{
    deleteItem(){
      this.$emit('deleteItem')
    }
  }
};
</script>