const express = require('express');
const Book = require('../models/books')

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const book = await Book.find()
        res.json(book);
    } catch (err) {
        res.json({ msg: err })
    }

})

router.get('/:id', async (req, res) => {
    try {
        let b = await Book.findById({ _id: req.params.id })
        res.json(b);
    } catch (err) {
        res.json({ msg: err })
    }
})

// Insert
router.post('/', async (req, res) => {
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

// Update
router.put('/:id', async (req, res) => {
    const { name, author, price } = req.body
    try {
        const updateBook = await Book.updateOne({ _id: req.params.id }, {
            $set: {
                name,
                author,
                price
            }
        })
    } catch (err) {
        res.json({ msg: err })
    }
})

// Delete
router.delete('/:id', async (req, res) => {
    try {
        const deleteBook = Book.findByIdAndDelete({ _id: req.params.id })
        res.json(deleteBook)
    } catch (err) {
        res.json({ msg: err })
    }
})