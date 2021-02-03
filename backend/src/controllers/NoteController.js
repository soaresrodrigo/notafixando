const mongoose = require('mongoose')

const Note = mongoose.model('Note')

module.exports = {

  // Listagem das notas
  async index (req, res) {
    const notes = await Note.find().sort('-updatedAt')
    return res.json(notes)
  },

  // Cadastro de notas
  async store (req, res) {
    try {
      var note = await Note.create(req.body)
      return res.json(note)
    } catch (error) {
      return res.send({error: "Não foi possível cadastrar"})
    }
  },

  // Remoção da nota
  async destroy(req, res){

    try {
      var data = await Note.findByIdAndDelete(req.params.id)
      return res.send(data)
    } catch (error) {
      return res.send({error: "Não foi possível excluir"})
    }

  }
}