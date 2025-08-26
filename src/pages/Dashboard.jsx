import React, { useEffect, useState } from "react";

import ProjectForm from "../components/ProjectForm";
import { AuthService, ProjectService } from "../store";

export default function Dashboard() {
  const current = AuthService.currentUser();
  const [sentProject, setSentProject] = useState(null);
  const [error, setError] = useState("");
  const [myProjects, setMyProjects] = useState([]);

  useEffect(() => {
    if (current?.email) {
      setMyProjects(ProjectService.getProjectsForHomeowner(current.email));
    }
  }, [sentProject]);

  if (!current || current.role !== "Homeowner") {
    return <div className="alert alert-warning">Homeowner access only.</div>;
  }

  const contractors = AuthService.listContractors();

  const [form, setForm] = useState({ contractorEmail: contractors[0]?.email || "" });

  const handleCreate = (proj) => {
    setError("");
    try {
      if (!form.contractorEmail) throw new Error("Select a contractor");
      const created = ProjectService.createAndSendToContractor({
        homeownerEmail: current.email,
        contractorEmail: form.contractorEmail,
        projectName: proj.name,
        projectType: proj.type,
        kitchenAreaSqFt: proj.kitchenAreaSqFt
      });
      setSentProject(created);
    } catch (e) {
      setError(e.message || "Failed to create project");
    }
  };

  return (
    <div className="container py-3">
      <h3>Homeowner Dashboard</h3>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card p-3 mb-3">
        <label className="form-label">Send To Contractor</label>
        <select className="form-control" value={form.contractorEmail} onChange={(e)=>setForm({ contractorEmail: e.target.value })}>
          {contractors.map(c => (
            <option key={c.email} value={c.email}>{c.name} ({c.email})</option>
          ))}
        </select>
      </div>

      {!sentProject && (
        <ProjectForm onSubmit={handleCreate} />
      )}

      {sentProject && (
        <div className="card p-3 mb-3">
          <h5>Project Sent</h5>
          <div><strong>Name:</strong> {sentProject.name}</div>
          <div><strong>Type:</strong> {sentProject.type}</div>
          <div><strong>Kitchen Area:</strong> {sentProject.kitchenAreaSqFt} sq.ft</div>
          <div><strong>Status:</strong> {sentProject.status}</div>
        </div>
      )}

      <div className="card p-3">
        <h5>My Projects</h5>
        {myProjects.length === 0 && <div className="text-muted">No projects yet.</div>}
        <ul className="list-group">
          {myProjects.map(p => (
            <li key={p.id} className="list-group-item">
              <div className="d-flex w-100 justify-content-between">
                <div>
                  <strong>{p.name}</strong> — {p.type} — {p.kitchenAreaSqFt} sq.ft
                </div>
                <small>Status: {p.status}</small>
              </div>
              {p.status === "to_homeowner" && (
                <div className="mt-1"><strong>Total:</strong> ${p.total}</div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
