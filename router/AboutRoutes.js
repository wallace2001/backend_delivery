const express = require('express');
const router = express.Router();
const About = require('../models/about');

router.get('/getabout', async(req,res) => {
    const description = await About.find().populate('descriptions');

    try {
        res.send(description);
    } catch (error) {
        res.send({error: "Erro ao encontrar uma descrição!"});
    }

});

router.post('/sendabout', async(req, res) => {
    const { title } = req.body;

    try {
        if(await About.findOne({ title }))
            return res.send({ message: "Já existe uma descrição, apague ou edite" });
        const description = await About.create(req.body);
        
        res.send(description);
    } catch (error) {
        res.send({error: "Erro ao criar a descrição da empresa!"});
    }
});

router.patch('/sendupdate/:id', async(req, res) => {
    const { title, description } = req.body;

    try {
        const update = await About.findByIdAndUpdate(req.params.id, {
            title,
            description,
        }, {new: true, useFindAndModify: false});

        await About.deleteOne({ update: update.id });
        await update.save();

        res.send(update);

    } catch (error) {
        res.send({error: "Erro ao atualizar descrição!"});
    }
});

router.delete('/deletedesc/:id', async(req, res) => {

    await About.findByIdAndRemove(req.params.id);
    
    try {
        res.send({message: "Apagado com sucesso!"});
    } catch (error) {
        res.send({error: "Erro ao deletar"});
    }
    

});

module.exports = router;