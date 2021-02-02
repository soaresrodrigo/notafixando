<template>
  <div>
    Minha página principal
    <button @click="cadastrar()">Cadastrar</button>
  </div>
</template>

<script>
import { http } from '@/http'
export default {
  name: 'Note',
  methods: {
    async cadastrar () {
      try {
        var data = await http.get('')
        console.log('tag', data)
      } catch (error) {
        console.log('tag', error)
      }
    }
  }
}
</script>
