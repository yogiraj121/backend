const BASE_URL = import.meta.env.VITE_API_BASE || "https://backend-4-bllb.onrender.com";

export async function uploadFile(file) {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch(`${BASE_URL}/api/uploads`, {
    method: "POST",
    body: form,
  });
  if (!res.ok) throw new Error("Upload failed");
  return res.json();
}

export async function listStudents() {
  const res = await fetch(`${BASE_URL}/api/students`);
  if (!res.ok) throw new Error("Failed to load students");
  return res.json();
}

export async function updateStudent(id, payload) {
  const res = await fetch(`${BASE_URL}/api/students/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update student");
  return res.json();
}

export async function deleteStudent(id) {
  const res = await fetch(`${BASE_URL}/api/students/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete student");
  return res.json();
}

export async function listHistory() {
  const res = await fetch(`${BASE_URL}/api/uploads/history`);
  if (!res.ok) throw new Error("Failed to load history");
  return res.json();
}
