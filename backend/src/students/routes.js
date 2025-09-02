const express = require("express");
const { listStudents, updateStudent, deleteStudent } = require("./controller");

const router = express.Router();

// List all students
router.get("/", listStudents);

// Update a student's marks
router.put("/:id", updateStudent);

// Delete a student
router.delete("/:id", deleteStudent);

module.exports = router;
