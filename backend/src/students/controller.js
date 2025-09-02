const Student = require("./model");

async function listStudents(_req, res) {
  try {
    const students = await Student.find({}).sort({ created_at: -1 });
    res.json({ count: students.length, students });
  } catch (_err) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
}

async function updateStudent(req, res) {
  try {
    const { marks_obtained, total_marks, student_name } = req.body;
    const updates = {};
    if (typeof marks_obtained === "number")
      updates.marks_obtained = marks_obtained;
    if (typeof total_marks === "number") updates.total_marks = total_marks;
    if (typeof student_name === "string") updates.student_name = student_name;

    if (updates.total_marks != null || updates.marks_obtained != null) {
      const doc = await Student.findById(req.params.id);
      if (!doc) return res.status(404).json({ error: "Student not found" });
      const t =
        updates.total_marks != null ? updates.total_marks : doc.total_marks;
      const m =
        updates.marks_obtained != null
          ? updates.marks_obtained
          : doc.marks_obtained;
      updates.percentage = t > 0 ? Number(((m / t) * 100).toFixed(2)) : 0;
    }

    const updated = await Student.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });
    res.json(updated);
  } catch (_err) {
    res.status(500).json({ error: "Failed to update student" });
  }
}

async function deleteStudent(req, res) {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Student not found" });
    res.json({ ok: true });
  } catch (_err) {
    res.status(500).json({ error: "Failed to delete student" });
  }
}

module.exports = { listStudents, updateStudent, deleteStudent };
