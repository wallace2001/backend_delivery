const { Router } = require('express');

const EvalController = require('./Controllers/Product');

const router = Router();

router.get('/evaluation/getevaluation', EvalController.index)
router.post('/evaluation/sendevaluation', EvalController.store)
router.delete('/evaluation/deleteevaluation/:id', EvalController.delete)
router.patch('/evaluation/sendevaluationn/:id', EvalController.update)

module.exports = router;