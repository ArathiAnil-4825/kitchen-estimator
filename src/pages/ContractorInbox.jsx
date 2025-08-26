import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthService, ProjectService } from "../store";

export default function ContractorInbox() {
  const current = AuthService.currentUser();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (current && current.role === "Contractor") {
      setProjects(ProjectService.getProjectsForContractor(current.email));
    }
  }, []);

  if (!current || current.role !== "Contractor") {
    return <div className="alert alert-warning">Contractor access only.</div>;
  }

  return (
    <div>
      <h3>Contractor Projects</h3>
      {projects.length === 0 && <div className="alert alert-info">No projects assigned yet.</div>}
      <div className="list-group">
        {projects.map(p => (
          <Link key={p.id} to={`/contractor/project/${p.id}`} className="list-group-item list-group-item-action">
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{p.name}</h5>
              <small>{p.type}</small>
            </div>
            <small>{p.kitchenAreaSqFt} sq.ft | From: {p.homeownerEmail}</small>
          </Link>
        ))}
      </div>
    </div>
  );
}