const express = require('express');
const router = express.Router();

// Job Posting Schema
const Job = require('../models/Job');

// Create a new job posting
router.post('/create', async (req, res) => {
    const { title, description, requirements } = req.body;
    try {
        const newJob = new Job({ title, description, requirements });
        await newJob.save();
        res.status(201).json(newJob);
    } catch (error) {
        res.status(500).json({ message: "Error creating job", error });
    }
});

module.exports = router;
