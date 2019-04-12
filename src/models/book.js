const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchemaBook = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    edition: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    year: {
        type: Number
    },
    image: {
        type: String
    },
    rating: {
        type: Number,
        default: 0
    },
    numVotes: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Books', SchemaBook);