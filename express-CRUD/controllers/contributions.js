const express = require('express')
const router = express.Router();
const Contribution = require('../models/contributions');

router.get('/', async (req, res, next) => {
    try{
        const Contributions = await Contribution.find({"comic" : req.query.comic});
        res.json({
            status: 200,
            data: Contributions
        });
    }catch(err){
        res.send(err)
   }
});
router.post('/', async (req, res) => {
    try {
        const createdContribution = await Contribution.create(req.body);
        res.json({
            status: 200,
            data: createdContribution
        });
    }catch(err){
        res.send(err);
    }
});
router.delete('/:id', async (req, res) => {
    try{
        await Contribution.findByIdAndRemove(req.params.id);
    } catch(err){
        res.send(err);
    }
})
router.put('/:id', async (req, res) => {
    try{
        const updatedContribution = await Contribution.findByIdAndUpdate(req.params.id, req.body);
        res.json({
            status: 200,
            data: updatedContribution,
        });
    }catch(err){
        res.send(err);
    }  
})

module.exports = router;