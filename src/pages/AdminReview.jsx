import { useEffect, useMemo, useState } from "react";
import { AuthService, ProjectService } from "../store";

export default function AdminReview() {
  const current = AuthService.currentUser();
  const [projects, setProjects] = useState([]);
  const [lastApproved, setLastApproved] = useState(null);

  useEffect(() => {
    setProjects(ProjectService.getProjectsForAdmin());
  }, [lastApproved]);

  if (!current || current.role !== "Administrator") {
    return <div className="alert alert-warning">Administrator access only.</div>;
  }

  const approve = (id) => {
    const updated = ProjectService.approveComputeTotalAndSendToHomeowner(id);
    setLastApproved(updated.id);
  };

  return (
    <div>
      <h3>Administrator Review</h3>
      {projects.length === 0 && <div className="alert alert-info">No projects pending.</div>}
      <div className="list-group">
        {projects.map(p => {
          const total = (p.items || []).reduce((s, it) => s + (Number(it.cost) || 0), 0);
          return (
            <div key={p.id} className="list-group-item">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{p.name}</h5>
                <small>{p.type}</small>
              </div>
              <div className="mb-2">{p.kitchenAreaSqFt} sq.ft | From: {p.homeownerEmail}</div>
              <ul className="mb-2">
                {(p.items || []).map((it, idx) => (
                  <li key={idx}>{it.name}: ${Number(it.cost) || 0}</li>
                ))}
              </ul>
              <div className="mb-2"><strong>Total:</strong> ${total}</div>
              <button className="btn btn-success" onClick={()=>approve(p.id)}>Send Total to Homeowner</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}