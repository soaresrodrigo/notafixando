const express = require('express')
const multer = require('multer')
const NoteController = require('./controllers/NoteController')

const routes = new express.Router()
const upload = multer()

// Rotas
routes.get('/', NoteController.index)
routes.post('/', upload.single(), NoteController.store)
routes.delete('/:id', NoteController.destroy)

module.exports = routes