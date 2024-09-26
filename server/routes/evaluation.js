const express = require('express');
const router = express.Router();

// Evaluation Schema
const Evaluation = require('../models/Evaluation');

// Submit performance evaluation
router.post('/submit', async (req, res) => {
    const { internId, score, feedback } = req.body;
    try {
        const newEvaluation = new Evaluation({ internId, score, feedback });
        await newEvaluation.save();
        res.status(201).json(newEvaluation);
    } catch (error) {
        res.status(500).json({ message: "Error submitting evaluation", error });
    }
});

module.exports = router;
