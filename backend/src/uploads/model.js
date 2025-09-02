const mongoose = require("mongoose");

const UploadLogSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true },
    filetype: { type: String, enum: ["xlsx", "csv"], required: true },
    total_records: { type: Number, required: true },
    success_count: { type: Number, required: true },
    error_count: { type: Number, required: true },
    errors: [{ row: Number, message: String }],
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model("UploadLog", UploadLogSchema);
