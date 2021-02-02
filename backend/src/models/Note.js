const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
  title: String,
  description: String
}, {
  timestamps: true
})

// module.exports = mongoose.model('Note', NoteSchema)
mongoose.model('Note', NoteSchema)