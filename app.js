const express = require('express')
const app = express()
const Book = require('./models/books')
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/demo', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Successfully connected to Database!')
})

app.use(express.json())

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

app.get('/api', async (req, res) => {
    try {
        const book = await Book.find()
        res.json(book);
    } catch (err) {

    }

})

app.get('/api/:id', async (req, res) => {
    try {
        let b = await Book.findById({ _id: req.params.id })
        res.json(b);
    } catch (err) {
        res.json({ msg: err })
    }
})

app.post('/api', async (req, res) => {
    const { name, author, price } = req.body

    let b = new Book({
        name,
        author,
        price
    })

    try {
        b = await b.save();
        res.json(b);
    } catch (err) {
        res.json({ msg: err })
    }

})

app.listen(3000, () => {
    console.log('Connected to 3000');
})