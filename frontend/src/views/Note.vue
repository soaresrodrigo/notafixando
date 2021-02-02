<template>
  <div>
    <b-container fluid class="bg-light window">
      <div class="p-3">
        <!-- Buscar -->
      <b-row>
        <div class="col-sm-12 col-md-5 col-lg-5 mx-auto mb-5">
          <b-form-input
          type="search"
          placeholder="procure a nota"
        ></b-form-input>
        </div>
      </b-row>
      <!-- Cadastrar nota -->
      <div>
        <b-btn v-b-toggle.sidebar-create variant="outline-primary" class="float-right">
          <b-icon icon="plus"></b-icon>
        </b-btn>

          <b-sidebar
            class="p-3"
            ref="mySidebar"
            id="sidebar-create"
            title="Cadastrar nota"
            backdrop-variant="dark"
            backdrop
            shadow
            right
          >

          <b-form @submit.prevent.stop="create()">
            <b-row class="m-1">
              <b-form-group class="col-12" label="Título">
                <b-form-input v-model="form.title" required placeholder="Meu título"></b-form-input>
              </b-form-group>
              <b-form-group class="col-12">
                <label for="textarea">Descrição</label>
                <b-form-textarea
                  id="textarea"
                  required
                  v-model="form.description"
                  placeholder="Minha descrição"
                  rows="3"
                ></b-form-textarea>
              </b-form-group>
              <b-form-group class="col-12" label="Cor">
                <b-form-radio-group
                  v-model="form.color"
                  :options="colors"
                  :button-variant="form.color"
                  size="lg"
                  buttons
                ></b-form-radio-group>
              </b-form-group>
              <b-button type="submit" variant="outline-primary" class="mx-auto mt-5">
                <b-icon icon="plus"></b-icon>
                Adicionar
              </b-button>
            </b-row>
          </b-form>
          </b-sidebar>
        </div>
      <!-- Notas -->
      <b-row>
        <div v-for="note in notes" :key="note._id" class="col-sm-12 col-md-3 col-lg-3 mx-auto">
          <b-card class="mb-3 text-center" :bg-variant="note.color" text-variant="white">
            <b-card-header>
              {{note.title}}
            </b-card-header>
            <b-card-text>{{note.description}}</b-card-text>
            <b-card-text>
              <b-btn @click="deleteNote(note)" variant="transparent" class="text-right" title="Excluir nota?">
                <b-icon icon="trash" variant="white"></b-icon>
              </b-btn>
            </b-card-text>
          </b-card>
        </div>
      </b-row>
      </div>
    </b-container>
  </div>
</template>

<script>
import { http } from '@/http'
export default {
  name: 'Note',
  data: () => ({
    notes: [],
    load: false,
    form: {
      title: '',
      description: '',
      color: 'primary'
    },
    colors: [
      { text: '', value: 'primary' },
      { text: '', value: 'danger' },
      { text: '', value: 'warning' },
      { text: '', value: 'success' }
    ]
  }),
  methods: {
    getNotes: async () => await http.get(''),
    async create () {
      try {
        var nota = await http.post('', this.form)
        this.$root.$emit('bv::toggle::collapse', 'sidebar-create')
        this.notes.unshift(nota.data)
        this.form.title = ''
        this.form.description = ''
        this.form.color = 'primary'
      } catch (error) {
        console.log('tag', error)
      }
    },
    async deleteNote (note) {
      try {
        await http.delete(note._id)
        this.notes.splice(note, 1)
      } catch (error) {
        console.log('tag', error)
      }
    }
  },
  mounted () {
    this.getNotes().then(resposta => {
      this.load = true
      this.notes = resposta.data
    }).finally(() => {
      this.load = false
    })
  }
}
</script>

<style scoped>
  .window {
    min-height: 100vh;
    max-width: 100vw;
    height: 100%;
    width: 100%;
  }

  .card {
    -webkit-box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.22);
    -moz-box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.22);
    box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.22);
    border: none;
  }
</style>
