const mongoose = require('mongoose');
const Book = require('../models/book');

const post = async(req, res) => {
    await Book.create(req.body, function(err, book){
        if(err)
            return res.status(400).send();
        else
            return res.status(200).json(book);
    });
}

const destroy = async(req, res) => {
    if(mongoose.Types.ObjectId.isValid(req.params.id)){
        await Book.findOneAndRemove({_id: req.params.id}, function(err){
                if(err)
                    return res.status(400).send('Not found');
                else
                    return res.send();
            });
        return res.send();
    }
    else{
        return res.status(400).send();
    }
}

const getBooks = async(req, res) => {
    const books = await Book.find();
    return res.json(books);
}

const getBook = async(req, res) => {
    const books = await Book.findOne({_id: req.params.id});
    return res.json(books);
}

const update = async(req, res) => {

    if(mongoose.Types.ObjectId.isValid(req.params.id)){
        Book.findOneAndUpdate({_id: req.params.id}, req.body, function(err, book){
            if(err)
                return res.status(400).send('Not found');
            else
                return res.json(book);
        });
    } else {
        return res.status(400).send('Not found');
    }
}

module.exports = {
    post,
    getBooks,
    destroy,
    getBook,
    update
};