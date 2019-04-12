const mongoose = require('mongoose');
const Users = mongoose.model('Users');
const auth = require('../services/auth');

const getUser = async(req, res) => {
    const user = await Users.findOne({_id: req.params.id});
    return res.json(user);
}

const post = async(req, res) => { // signup
    await Users.create(req.body, function(err, cliente){
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
        
        console.log(user._id);

        const token = await auth.generateToken({
            id: user._id,
            email: user.email,
            password: user.password,
            roles: user.roles
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