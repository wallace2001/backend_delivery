const express = require('express');
const router = express.Router();
const User = require('../models/login');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../Middlewares/auth');


const generateToken = (params = {}) => {
    return jwt.sign(params, process.env.SECRET_TOKEN, {
        expiresIn: 86400,
    });
}

router.post('/signup', async (req,res) => {

    const { email } = req.body;

    try {
         if(await User.findOne({ email }))
             return res.status(400).send({message : "E-mail já existe!" });
        
        const user = await User.create(req.body);
        user.password = undefined;
        const token = generateToken({id: user.id});

        res.send({
            user,
            token
        });

    } catch (error) {
        res.status(400).send({error: "Erro ao se cadastrar!"});
    }
});

router.post('/signin', async (req, res) => {
    const { email, password} = req.body;


    const user = await User.findOne({ email }).select('+password');
    

    if(!user)
        return res.send({message: "E-mail não encontrado!"});
        
    if(!await bcrypt.compare(password, user.password))
        return res.send({message: "Senha invalida!"});

    user.password = undefined;


    res.send({
        user,
        token: generateToken({id: user.id})
    });

});

router.get('/users', authMiddleware, async (req, res) =>{
    try {
        const users = await User.find().populate('users');

        res.send(users);
    } catch (error) {
        res.send({error: "Erro ao listar usuarios!"});
    }
})

router.get('/me', authMiddleware, async (req, res) => {

        const user = await User.findById(req.userId).populate('users');
        res.send({ok : true, user: user.name, email: user.email});

});

router.delete('/deleteuser/:id', async(req,res) => {
    const { params } = req.params.id;

    try {
        await User.findByIdAndDelete(params);
        res.send();
    } catch (error) {
        res.status(400).send({ error: "Erro ao deletar usuario!" });
    }
});

module.exports = router;