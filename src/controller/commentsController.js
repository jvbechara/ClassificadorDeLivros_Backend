const mongoose = require('mongoose');
const Comments = require('../models/comments');
const auth = require('../services/auth');

const getIdUser = async(req) => {
    var token = req.body.token || req.query.token || req.headers['xtoken'];
    const iduser = await auth.decodeToken(token);
    return(iduser.id);
}

const getComments = async(req, res) => {
    const comments = await Comments.find();
    return res.json(comments);
}

const post = async(req, res) => {
    var data = await getIdUser(req);
    const objBook = req.body;
    objBook['userId'] = data;
    objBook['bookId'] = req.params.id;
    //console.log(objBook);

    await Comments.create(objBook, function(err, comment){
        if(err)
            return res.status(400).send();
        else
            return res.status(200).json(comment);
    });
}

const destroy = async(req, res) => {
    if(mongoose.Types.ObjectId.isValid(req.params.id)){
        await Comments.findOneAndRemove({_id: req.params.id}, function(err){
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

module.exports = {
    post,
    getComments,
    destroy
};