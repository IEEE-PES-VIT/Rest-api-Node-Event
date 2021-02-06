const express = require('express')
const app = express()
const mongoose = require('mongoose');
const router = require('./routes/server')

mongoose.connect('mongodb://localhost/demo', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Successfully connected to Database!')
})

// Middlewares
app.use(express.json())
app.use('/api', router)

// HTTP verbs -> REST api => CRUD
// GET
// POST
// PUT/PATCH
// Delete
// To Stop Server: Ctrl + c
// Postman

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>')
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('Connected to 3000');
})