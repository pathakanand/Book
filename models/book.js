const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    img:{
        type:String,
        required:true
    },
    price: {
        type: Number,
        required:true,
        trim:true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    genre: {
        type: String,
        required: true,
        trim: true
    }
})

const Book = mongoose.model('Book',bookSchema);

module.exports = Book;