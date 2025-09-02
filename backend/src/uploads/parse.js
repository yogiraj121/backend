const xlsx = require("xlsx");
const { parse } = require("csv-parse/sync");

function normalizeHeader(value) {
  if (!value) return "";
  return String(value).trim().toLowerCase().replace(/\s+/g, "_");
}

function mapRecord(raw) {
  const r = {};
  for (const key of Object.keys(raw)) {
    r[normalizeHeader(key)] = raw[key];
  }
  const student_id = String(
    r["student_id"] || r["ssttuuddeenntt__iidd"] || ""
  ).trim();
  const student_name = String(
    r["student_name"] || r["ssttuuddeenntt__nnaammee"] || ""
  ).trim();
  const total_marks = Number(
    r["total_marks"] || r["ttoottaall__mmaarrkkss"] || 0
  );
  const marks_obtained = Number(
    r["marks_obtained"] || r["mmaarrkkss__oobbttaaiinneedd"] || 0
  );
  if (
    !student_id ||
    !student_name ||
    !Number.isFinite(total_marks) ||
    !Number.isFinite(marks_obtained)
  ) {
    throw new Error("Missing or invalid required fields");
  }
  const percentage =
    total_marks > 0
      ? Number(((marks_obtained / total_marks) * 100).toFixed(2))
      : 0;
  return { student_id, student_name, total_marks, marks_obtained, percentage };
}

function parseXlsx(buffer) {
  const wb = xlsx.read(buffer, { type: "buffer" });
  const firstSheet = wb.SheetNames[0];
  const sheet = wb.Sheets[firstSheet];
  const json = xlsx.utils.sheet_to_json(sheet, { defval: "" });
  return json.map(mapRecord);
}

function parseCsv(buffer) {
  const text = buffer.toString("utf8");
  const records = parse(text, { columns: true, skip_empty_lines: true });
  return records.map(mapRecord);
}

module.exports = { parseXlsx, parseCsv };
