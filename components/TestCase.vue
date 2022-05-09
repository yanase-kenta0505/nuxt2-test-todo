<template>
  <div>
    <h3>{{Mes}}</h3>
    <v-btn @click="chnageMes">change</v-btn>
  </div>
</template>

<script>
import { defineComponent,ref } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const Mes = ref('hello')
    const chnageMes = () =>{
      console.log('hello')
    }
  return{Mes,chnageMes}
  },

})
</script>
