const express = require('express')
const NoteController = require('./controllers/NoteController')

const routes = new express.Router()
// Rotas
routes.get('/', NoteController.index)
routes.post('/', NoteController.store)
routes.delete('/:id', NoteController.destroy)

module.exports = routes