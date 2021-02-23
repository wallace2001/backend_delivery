const Contact = require('../models/telfone');
const Whats = require('../models/whats');
const Ifood = require('../models/ifood');
const express = require('express');
const router = express.Router();

router.get('/contactgettel', async(req, res) => {
    try {
        const contact = await Contact.find();
        res.send(contact)
    } catch (error) {
        res.send({error: "Erro ao listar contatos"});
    }
})

router.get('/contactgetwhats', async(req, res) => {
    try {
        const contact = await Whats.find();
        res.send(contact)
    } catch (error) {
        res.send({error: "Erro ao listar contatos"});
    }
})

router.get('/contactgetifood', async(req, res) => {
    try {
        const contact = await Ifood.find();
        res.send(contact)
    } catch (error) {
        res.send({error: "Erro ao listar contatos"});
    }
})

router.post('/contactposttelfone', async(req, res) => {
    const { info } = req.body;

    try {
        const contact = await Contact.create({info,});
        res.send(contact);
    } catch (error) {
        res.send({error: "Erro ao criar contato!"})
    }
})

router.post('/contactpostwhats', async(req, res) => {
    const { info } = req.body;

    try {
        const contact = await Whats.create({info,});
        res.send(contact);
    } catch (error) {
        res.send({error: "Erro ao criar contato!"})
    }
})

router.post('/contactpostifood', async(req, res) => {
    const { info } = req.body;

    try {
        const contact = await Ifood.create({info,});
        res.send(contact);
    } catch (error) {
        res.send({error: "Erro ao criar contato!"})
    }
})

router.delete('/contactdeletetel/:id', async(req, res) => {
    try {
        const delet = await Contact.findByIdAndDelete(req.params.id, {useFindAndModify: false});
        res.send(delet); 
    } catch (error) {
        res.send({ error: "Erro ao deletar contato!" });
    }
})

router.delete('/contactdeleteifood/:id', async(req, res) => {
    try {
        const delet = await Ifood.findByIdAndDelete(req.params.id, {useFindAndModify: false});
        res.send(delet); 
    } catch (error) {
        res.send({ error: "Erro ao deletar contato!" });
    }
})

router.delete('/contactdeletewhats/:id', async(req, res) => {
    try {
        const delet = await Whats.findByIdAndDelete(req.params.id, {useFindAndModify: false});
        res.send(delet); 
    } catch (error) {
        res.send({ error: "Erro ao deletar contato!" });
    }
})

router.patch('/contactpatchtel/:id', async(req, res) => {

    const { info} = req.body;

    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id, {
            info,
        }, {new: true, useFindAndModify: false});

        await Contact.deleteOne({ contact: contact.id });
        await contact.save();

        res.send(contact);

    } catch (error) {
        res.send({ error: "Erro ao atualizar contato!" })
    }
});

router.patch('/contactpatchwhats/:id', async(req, res) => {

    const { info} = req.body;

    try {
        const contact = await Whats.findByIdAndUpdate(req.params.id, {
            info,
        }, {new: true, useFindAndModify: false});

        await Whats.deleteOne({ contact: contact.id });
        await contact.save();

        res.send(contact);

    } catch (error) {
        res.send({ error: "Erro ao atualizar contato!" })
    }
});


router.patch('/contactpatchifood/:id', async(req, res) => {

    const { info } = req.body;

    try {
        const contact = await Ifood.findByIdAndUpdate(req.params.id, {
            info,
        }, {new: true, useFindAndModify: false});

        await Ifood.deleteOne({ contact: contact.id });
        await contact.save();

        res.send(contact);

    } catch (error) {
        res.send({ error: "Erro ao atualizar contato!" })
    }
});


module.exports = router;