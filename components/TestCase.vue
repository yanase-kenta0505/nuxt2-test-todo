<template>
  <div>
    <h3>{{mes}}</h3>
    <v-btn @click="changeMes">change</v-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent,ref, PropType } from '@nuxtjs/composition-api'
enum Sex {
  Male = 'Male',
  Female = 'Female'
}

interface Human {
  name: string,
  age: number,
  sex: Sex
}
export default defineComponent({
  props: {
    message: {
      type: Boolean,
      required: true
    },
    person: {
      type: Object as PropType<Human>,
      required: true
    }
  },
  setup() {
    const mes = ref<string>()
    const changeMes = () =>{
      mes.value = 'jjj'
    }
    return {
      mes,
      changeMes
    }
  },

})
</script>
