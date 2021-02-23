const express = require('express');
const Dessert = require('../models/dessert');
const multerConfig = require('../multer/index');
const multer = require('multer');
const multerMiddleware = multer(multerConfig);
const router = express.Router();

router.get('/dessertget', async(req,res) => {
    try {
        const get = await Dessert.find();
        res.send(get);
    } catch (error) {
        res.status(400).send({ error: "Erro ao mostrar todos os produtos!" });
    }
})

router.post('/dessertpost', multerMiddleware.single('file'),async(req,res) => { 
    const { name, description, price } = req.body;
    console.log(name);
    console.log(description);
    console.log(price);
    console.log(req.file);
    try {
        const desc = await Dessert.create({
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

router.patch('/dessertpatch/:id', multerMiddleware.single('file'), async(req,res) => {
    const { name, description, price } = req.body;
    try {
        const update = await Dessert.findByIdAndUpdate(req.params.id, {
            name,
            description,
            price,
            key: req.file.key,
            url: req.file.location
        }, {new: true, useFindAndModify: false});

        await Dessert.deleteOne({update: update.id});
        await update.save();
        res.send(update);
    } catch (error) {
        res.send({ error: "Erro ao atualizar o produto!" });
    }
})

router.delete('/dessertdelete/:id', async(req,res) => {
    
    try {
        await Dessert.findByIdAndDelete(req.params.id, {useFindAndModify: false});
        res.send({ message: "Deletado com sucesso!" });
    } catch (error) {
        res.status(400).send({ error: "Erro ao deletar produto!" });   
    }
    
})

module.exports = router;