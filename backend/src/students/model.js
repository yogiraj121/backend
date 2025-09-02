const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
  {
    student_id: { type: String, required: true },
    student_name: { type: String, required: true },
    total_marks: { type: Number, required: true },
    marks_obtained: { type: Number, required: true },
    percentage: { type: Number, required: true },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

StudentSchema.index({ student_id: 1 }, { unique: true });

module.exports = mongoose.model("Student", StudentSchema);
