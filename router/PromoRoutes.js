const express = require('express');
const Promo = require('../models/promo');
const multerConfig = require('../multer/index');
const multer = require('multer');
const multerMiddleware = multer(multerConfig);
const router = express.Router();

router.get('/promoget', async(req,res) => {
    try {
        const get = await Promo.find();
        res.send(get);
    } catch (error) {
        res.status(400).send({ error: "Erro ao mostrar todos os produtos!" });
    }
})

router.post('/promopost', multerMiddleware.single('file'),async(req,res) => { 
    const { name, description, price } = req.body;
    console.log(name);
    console.log(description);
    console.log(price);
    console.log(req.file);
    try {
        const desc = await Promo.create({
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

router.patch('/promopatch/:id', multerMiddleware.single('file'), async(req,res) => {
    const { name, description, price } = req.body;
    try {
        const update = await Promo.findByIdAndUpdate(req.params.id, {
            name,
            description,
            price,
            key: req.file.key,
            url: req.file.location
        }, {new: true, useFindAndModify: false});

        await Promo.deleteOne({update: update.id});
        await update.save();

        req.io.emit('updateProduct', update);
        res.send(update);
    } catch (error) {
        res.send({ error: "Erro ao atualizar o produto!" });
    }
})

router.delete('/promodelete/:id', async(req,res) => {
    
    try {
        await Promo.findByIdAndDelete(req.params.id, {useFindAndModify: false});
        res.send({ message: "Deletado com sucesso!" });
    } catch (error) {
        res.status(400).send({ error: "Erro ao deletar produto!" });   
    }
    
})

module.exports = router;