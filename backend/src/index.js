const express = require('express')
const mongoose = require('mongoose')
const requireDir = require('require-dir')
const cors = require('cors')

const app = express()

// Configurando o banco
const db_url = "mongodb+srv://rodrigo:ra50rUa2STB4jW4Y@banco-virtual-09p9a.mongodb.net/planne?retryWrites=true&w=majority"
mongoose.connect(db_url, {useUnifiedTopology: true, useNewUrlParser: true})

// Inicia as models
requireDir('./models')

// Utilizando as rotas
app.use(require('./routes'))

// Liberando aplicação
app.use(cors)

// Apontando a porta
app.listen(3000)