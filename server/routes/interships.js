// routes/internships.js
const express = require("express");
const router = express.Router();
const Student = require("../models/student"); // Import the Student model
const Internship = require("../models/internship"); // Import the Internship model

// Apply for an internship
router.post("/apply", async (req, res) => {
  const { userEmail, internshipId } = req.body;

  try {
    // Find the student by email
    const student = await Student.findOne({ emailId: userEmail });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Find the internship by ID
    const internship = await Internship.findById(internshipId);

    if (!internship) {
      return res.status(404).json({ message: "Internship not found" });
    }

    // Add the internship to the student's internships array if not already applied
    if (!student.internships.includes(internshipId)) {
      student.internships.push(internshipId);
      await student.save();
      return res.status(200).json({ message: "Successfully applied for the internship" });
    } else {
      return res.status(400).json({ message: "You have already applied for this internship" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
