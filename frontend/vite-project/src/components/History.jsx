import { useEffect, useState } from "react";
import { listHistory } from "../api";

export default function History({ refreshKey }) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await listHistory();
      setRows(data);
    })();
  }, [refreshKey]);

  return (
    <div>
      <h3>Upload History</h3>
      <table
        border="1"
        cellPadding="6"
        style={{ borderCollapse: "collapse", width: "100%" }}
      >
        <thead>
          <tr>
            <th>Filename</th>
            <th>Type</th>
            <th>Total</th>
            <th>Success</th>
            <th>Errors</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r._id}>
              <td>{r.filename}</td>
              <td>{r.filetype}</td>
              <td>{r.total_records}</td>
              <td>{r.success_count}</td>
              <td>{r.error_count}</td>
              <td>{new Date(r.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
