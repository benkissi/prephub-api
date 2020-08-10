const express = require("express");
const Quiz = require("../models/Quiz");
const router = new express.Router();

router.post('/quiz', async (req, res) => {
    try {
        console.log('body**',req.body)
        const quiz = new Quiz({...req.body})
        quiz.save();
        return res.status(201).json({ data: quiz.toJSON() })
    } catch (error) {
        console.error(error)
        return res.status(400).json(error)
    }
})

router.get('/quiz', async (req, res) => {
    try {
        let quizes = []
        const {teacherCode, category} = req.query


        if(teacherCode){
            quizes = await Quiz.find({teacherCode})
        }

        if(category){
            quizes = await Quiz.find({category})
        }
        
        console.log(quizes)
        return res.status(200).json({
            data: quizes
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({error})
    }
})


module.exports = router