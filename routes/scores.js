const express = require("express");
const Score = require("../models/Score");
const Quiz = require("../models/Quiz");
const router = new express.Router();

router.post('/scores', async (req, res) => {
    try {
        const {testId} = req.body
        const score = new Score({...req.body})
        score.save();
        const updatedQuiz = await Quiz.findOneAndUpdate({_id: testId}, {$inc : {'takers' : 1}})
        return res.status(201).json({ data: score.toJSON() })
    } catch (error) {
        return res.status(400).json(error)
    }
})

router.get('/scores', async (req, res) => {
   
    try {
        let scores = []
        const {testId, studentCode} = req.query

        if(studentCode){
            scores = await Score.find({studentCode})
        }else{
            scores = await Score.find({testId})
        }
        return res.status(200).json({
            data: scores
        })
    } catch (error) {
        return res.status(400).json({error})
    }
})


module.exports = router