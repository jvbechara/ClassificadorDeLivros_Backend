const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchemaComments = new Schema({
    comments: {
        type: String,
        required: true
    },
    userId: {
        type: String
    },
    bookId:{
        type: String
    }
});

module.exports = mongoose.model('Comments', SchemaComments);