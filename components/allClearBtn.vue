<template>
  <v-btn icon @click="allClear">
    <v-icon class="mx-auto">mdi-delete</v-icon>
  </v-btn>
</template>

<script>
export default {
  methods: {
    allClear() {
      this.$emit('all-clear')
    }
  }
};
</script>
