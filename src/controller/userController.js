const mongoose = require('mongoose');
const Users = mongoose.model('Users');
const auth = require('../services/auth');
const md5 = require('md5');

const getUser = async(req, res) => {
    if(mongoose.Types.ObjectId.isValid(req.params.id)){
        const user = await Users.findOne({_id: req.params.id});
        return res.json(user);
    } else {
        return res.status(404).send();
    }
}

const post = async(req, res) => { // signup
    await Users.create({
        name: req.body.name,
        email: req.body.email,
        password: md5(req.body.password + global.SALT_KEY)
    }, function(err, cliente){
        if(err)
            return res.status(400).send();
        else
            return res.status(200).json(cliente);
    });
}

const authenticate = async(req, res) => { // signin
    try{
        const {email, password} = req.body;

        const user = await Users.findOne({email, password});

        if(!user){
            res.status(404).send('Email ou senha inválidos');
            return
        }
        
        const token = await auth.generateToken({
            id: user._id,
            email: user.email,
            password: user.password
        });

        res.status(201).send({
            token: token,
            data: {
                email: user.email,
                name: user.name
            }
        });
    } catch(e){
        res.status(500).send('Falha na requisição!');
    }
}

module.exports = {
    post,
    authenticate,
    getUser
};