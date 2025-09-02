const Student = require("../students/model");
const UploadLog = require("./model");
const { parseXlsx, parseCsv } = require("./parse");

async function handleUpload(req, res) {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const originalName = req.file.originalname || "upload";
  const lower = originalName.toLowerCase();
  const isXlsx = lower.endsWith(".xlsx");
  const isCsv = lower.endsWith(".csv");
  if (!isXlsx && !isCsv) {
    return res
      .status(400)
      .json({ error: "Only .xlsx or .csv files are supported" });
  }

  let records = [];
  try {
    records = isXlsx ? parseXlsx(req.file.buffer) : parseCsv(req.file.buffer);
  } catch (_err) {
    return res.status(400).json({ error: "Failed to parse file" });
  }

  const ops = records.map((r) => ({
    updateOne: {
      filter: { student_id: r.student_id },
      update: { $set: r },
      upsert: true,
    },
  }));

  let success = 0;
  const errors = [];
  try {
    if (ops.length > 0) {
      const result = await Student.bulkWrite(ops, { ordered: false });
      success =
        (result.upsertedCount || 0) +
        (result.modifiedCount || 0) +
        (result.matchedCount || 0);
    }
  } catch (e) {
    errors.push({ row: 0, message: e.message });
  }

  const log = await UploadLog.create({
    filename: originalName,
    filetype: isXlsx ? "xlsx" : "csv",
    total_records: records.length,
    success_count: success,
    error_count: errors.length,
    errors,
  });

  res.json({ ok: true, log });
}

async function listHistory(_req, res) {
  try {
    const logs = await UploadLog.find({}).sort({ created_at: -1 }).limit(50);
    res.json(logs);
  } catch (_err) {
    res.status(500).json({ error: "Failed to fetch upload history" });
  }
}

module.exports = { handleUpload, listHistory };
