import { useState } from "react";
import { uploadFile } from "../api";

export default function UploadForm({ onUploaded }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    setMessage("");
    try {
      await uploadFile(file);
      setMessage("Upload successful");
      setFile(null);
      onUploaded?.();
    } catch (e) {
      setMessage("Upload failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", gap: 8, alignItems: "center" }}
    >
      <input
        type="file"
        accept=".xlsx,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button disabled={loading || !file} type="submit">
        {loading ? "Uploading..." : "Upload"}
      </button>
      {message && <span>{message}</span>}
    </form>
  );
}
