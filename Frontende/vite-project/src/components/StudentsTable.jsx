import { useEffect, useState } from "react";
import { listStudents, updateStudent, deleteStudent } from "../api";

export default function StudentsTable({ refreshKey }) {
  const [rows, setRows] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const data = await listStudents();
      setRows(data.students);
      setCount(data.count);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  async function saveRow(id, partial) {
    const updated = await updateStudent(id, partial);
    setRows((old) => old.map((r) => (r._id === id ? updated : r)));
  }

  async function removeRow(id) {
    await deleteStudent(id);
    setRows((old) => old.filter((r) => r._id !== id));
    setCount((c) => c - 1);
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div style={{ margin: "8px 0" }}>
        Total students: <b>{count}</b>
      </div>
      <table
        border="1"
        cellPadding="6"
        style={{ borderCollapse: "collapse", width: "100%" }}
      >
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Name</th>
            <th>Total Marks</th>
            <th>Marks Obtained</th>
            <th>Percentage</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r._id}>
              <td>{r.student_id}</td>
              <td>
                <input
                  defaultValue={r.student_name}
                  onBlur={(e) =>
                    saveRow(r._id, { student_name: e.target.value })
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  defaultValue={r.total_marks}
                  onBlur={(e) =>
                    saveRow(r._id, { total_marks: Number(e.target.value) })
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  defaultValue={r.marks_obtained}
                  onBlur={(e) =>
                    saveRow(r._id, { marks_obtained: Number(e.target.value) })
                  }
                />
              </td>
              <td>{r.percentage}%</td>
              <td>
                <button onClick={() => removeRow(r._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
