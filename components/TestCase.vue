<template>
  <div>
    <h3>{{Mes}}</h3>
    <v-btn @click="changeMes">change</v-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent,ref } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const Mes = ref<string>('hello')
    const changeMes = () =>{
      Mes.value = 'foo'
    }
  return{Mes,changeMes}
  },

})
</script>
