const Eval = require('../models/evaluation');

class EvalController {
    async index(req, res) {
        try {
            const evaluation = await Eval.find();
            res.send(evaluation);
        } catch (error) {
            res.status(400).send({error: "Erro ao procurar avaliações!"});
        }
    }

    async store(req, res) {
        const {name, email, description, stars} = req.body;

        try {
            const evaluation = await Eval.create({
                name,
                email,
                description,
                stars,
            }) ;
    
            req.io.emit('newEvaluation', evaluation);
            console.log(req.io.emit('newEvaluation', evaluation));
            res.send(evaluation);
        } catch (error) {
            res.status(400).send({ error: "Erro ao enviar avaliação!" });
        }
    }

    async delete(req, res) {
        await Eval.findByIdAndDelete(req.params.id, {useFindAndModify: false});
        res.send({ message: "Avaliação deletada!" })
    }

    async update(req, res) {
        const {name, email, description, stars} = req.body;
        try {
            const update = await Eval.findByIdAndUpdate(req.params.id, {
                name,
                description,
                email,
                stars
            }, {new: true, useFindAndModify: false});
    
            await Eval.deleteOne({update: update.id});
            await update.save();
    
            res.send(update);
        } catch (error) {
            res.status(400).send({ error: "Erro ao atualizar avaliação!" });
        }
    }
}

module.exports = new EvalController;