const express = require('express');
const Desc = require('../models/description');
const Image = require('../models/image');
const multerConfig = require('../multer/index');
const multer = require('multer');
const multerMiddleware = multer(multerConfig);
const router = express.Router();

router.get('/descriptionget', async(req,res) => {
    try {
        const get = await Desc.find();
        res.send(get);
    } catch (error) {
        res.status(400).send({ error: "Erro ao mostrar todos os produtos!" });
    }
})

router.post('/descriptionpost', multerMiddleware.single('file'),async(req,res) => { 
    const { name, description, price } = req.body;
    try {
        const desc = await Desc.create({
            name,
            description,
            price,
            key: req.file.key,
            url: req.file.location
        });

        req.io.emit('newProduct', desc);
        console.log(req.io.emit('newProduct', desc));
        res.send(desc);
    } catch (error) {
        res.send(error);
    }
})

router.patch('/descriptionpatch/:id', multerMiddleware.single('file'), async(req,res) => {
    const { name, description, price } = req.body;
    try {
        const update = await Desc.findByIdAndUpdate(req.params.id, {
            name,
            description,
            price,
            key: req.file.key,
            url: req.file.location
        }, {new: true, useFindAndModify: false});

        await Desc.deleteOne({update: update.id});
        await update.save();

        req.io.emit('updateProduct', update);
        res.send(update);
    } catch (error) {
        res.send({ error: "Erro ao atualizar o produto!" });
    }
})

router.delete('/descriptiondelete/:id', async(req,res) => {
    
    try {
        await Desc.findByIdAndDelete(req.params.id, {useFindAndModify: false});
        res.send({ message: "Deletado com sucesso!" });
    } catch (error) {
        res.status(400).send({ error: "Erro ao deletar produto!" });   
    }
    
})

module.exports = router;