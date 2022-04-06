<template>
  <v-btn icon @click="deleteItem">
    <v-icon class="mx-auto">mdi-delete</v-icon>
  </v-btn>
</template>

<script>
export default {
  methods: {
    deleteItem() {
      this.$emit('deleteItem')
    }
  }
};
</script>