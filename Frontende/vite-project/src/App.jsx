import { useState } from "react";
import "./App.css";
import UploadForm from "./components/UploadForm";
import StudentsTable from "./components/StudentsTable";
import History from "./components/History";

function App() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [showHistory, setShowHistory] = useState(false);

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: 16 }}>
      <h1>Student Grades Manager</h1>
      <div style={{ marginBottom: 12, display: "flex", gap: 8 }}>
        <button onClick={() => setShowHistory((s) => !s)}>
          {showHistory ? "Hide History" : "Show History"}
        </button>
      </div>
      {showHistory && (
        <div style={{ marginBottom: 16 }}>
          <History refreshKey={refreshKey} />
        </div>
      )}
      <UploadForm onUploaded={() => setRefreshKey((k) => k + 1)} />
      <div style={{ marginTop: 16 }}>
        <StudentsTable refreshKey={refreshKey} />
      </div>
    </div>
  );
}

export default App;
