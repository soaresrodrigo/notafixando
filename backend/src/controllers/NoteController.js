const mongoose = require('mongoose')

const Note = mongoose.model('Note')

module.exports = {

  // Listagem das notas
  async index (req, res) {
    const notes = await Note.find().sort('-createdAt')
    return res.json(notes)
  },

  // Cadastro de notas
  async store (req, res) {
    const { title, description } = req.body

    const note = await Note.create({
      title,
      description
    })

    return res.json(note)
  },

  // Remoção da nota
  async destroy(req, res){
    await Note.findOneAndDelete(req.params.id)

    return res.send("Excluído com sucesso")
  }
}