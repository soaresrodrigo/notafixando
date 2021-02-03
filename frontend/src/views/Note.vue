<template>
  <div>
    <b-container class="bg-light window">
      <b-row>
        <div class="text-secondary pt-5 pl-3 col-sm-12 col-md-12 col-lg-12 text-left">
          <h1 class="h4">
            <b-icon icon="card-text"></b-icon>
            Notafixando
          </h1>
          <p>Gerencie todas as suas notas por aqui</p>
        </div>
        <div class="col-sm-12 col-md-5 col-lg-5 mx-auto mb-5">
          <b-input-group class="mt-3">
            <b-form-input
            class="text-center shadow-sm border-0"
            type="search"
            v-model="search"
            placeholder="pesquise pelo título da nota"
          ></b-form-input>
            <b-input-group-append>
              <b-btn v-b-toggle.sidebar-create variant="outline-primary" @click="repeatTitle()">
                <b-icon icon="plus"></b-icon>
              </b-btn>
            </b-input-group-append>
          </b-input-group>
        </div>
        </b-row>
      <div class="p-3">
      <!-- Cadastrar nota -->
      <div>
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
        <div v-for="(note, index) in filteredList" :key="index" class="col-sm-12 col-md-3 col-lg-3">
          <b-card class="mb-3 text-center" :bg-variant="note.color" text-variant="white">
            <b-card-header>
              {{note.title}}
            </b-card-header>
            <b-card-text>{{note.description}}</b-card-text>
            <b-card-text>
              <b-btn v-b-toggle="'my-collapse' + index" variant="transparent" class="text-right" title="Excluir nota?">
                <b-icon icon="clock" variant="white"></b-icon>
              </b-btn>
              <b-btn @click="deleteNote(note, index)" variant="transparent" class="text-right" title="Excluir nota?">
                <b-icon icon="trash" variant="white"></b-icon>
              </b-btn>
            </b-card-text>
            <b-collapse :id="'my-collapse' + index">
              <b-card :text-variant="note.color" bg-variant="light" class="shadow">
                <span style="font-size:.8em">Criado em: {{note.createdAt | moment('DD/MM/YYYY - HH:mm:ss')}}</span>
                <!-- <p style="font-size:.8em">Atualizado em: {{note.updatedAt | moment('DD/MM/YYYY - HH:mm:ss')}}</p> -->
              </b-card>
            </b-collapse>
          </b-card>
        </div>
      </b-row>

      <div v-if="notes.length < 1">
        <h1 class="text-center h4 text-secondary mt-5">
          <p>
            <b-icon icon="hourglass-split"></b-icon>
            Por enquanto não existe nenhuma nota cadastrada...
          </p>
        </h1>
      </div>

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
    message: '',
    search: '',
    form: {
      title: '',
      description: '',
      color: 'primary'
    },
    colors: [
      { text: '', value: 'primary' },
      { text: '', value: 'danger' },
      { text: '', value: 'warning' },
      { text: '', value: 'success' },
      { text: '', value: 'dark' }
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
        this.search = ''
      } catch (error) {
        console.log('tag', error)
      }
    },
    async deleteNote (note, index) {
      try {
        this.notes.splice(index, 1)
        await http.delete(note._id)
      } catch (error) {
        console.log('tag', error)
      }
    },
    repeatTitle () {
      if (this.search) {
        this.form.title = this.search
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
  },
  computed: {
    filteredList () {
      return this.notes.filter(note => {
        return note.title.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  }
}
</script>

<style lang="scss" scoped>
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
    transition: all .8s;
    border: none;
  }
</style>
