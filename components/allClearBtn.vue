<template>
  <v-app>
    <v-btn icon @click="allClear">
      <v-icon class="mx-auto">mdi-delete</v-icon>
    </v-btn>
  </v-app>
</template>

<script>
export default {
  methods:{
    allClear(){
      this.$emit('allClear')
    }
  }
};
</script>
