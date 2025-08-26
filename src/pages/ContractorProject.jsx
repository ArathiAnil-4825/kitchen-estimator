import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthService, ProjectService } from "../store";

export default function ContractorProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const current = AuthService.currentUser();
  const [project, setProject] = useState(null);
  const [items, setItems] = useState([{ name: "", cost: "" }]);
  const [error, setError] = useState("");

  useEffect(() => {
    setProject(ProjectService.getById(id));
  }, [id]);

  if (!current || current.role !== "Contractor") {
    return <div className="alert alert-warning">Contractor access only.</div>;
  }

  if (!project) return <div>Loading...</div>;

  const addRow = () => setItems(prev => [...prev, { name: "", cost: "" }]);
  const updateItem = (idx, field, value) => {
    setItems(prev => prev.map((it, i) => i === idx ? { ...it, [field]: value } : it));
  };
  const removeItem = (idx) => setItems(prev => prev.filter((_, i) => i !== idx));

  const submitToAdmin = () => {
    setError("");
    try {
      ProjectService.addItemsAndSendToAdmin(project.id, items);
      navigate("/contractor");
    } catch (e) {
      setError(e.message || "Failed to submit");
    }
  };

  return (
    <div>
      <h3>{project.name}</h3>
      <div className="mb-2 text-muted">{project.type} | {project.kitchenAreaSqFt} sq.ft</div>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="card p-3">
        <h5 className="mb-3">Add Items</h5>
        {items.map((it, idx) => (
          <div className="row g-2 align-items-end mb-2" key={idx}>
            <div className="col-md-6">
              <label className="form-label">Item</label>
              <input className="form-control" value={it.name} onChange={(e)=>updateItem(idx, "name", e.target.value)} />
            </div>
            <div className="col-md-3">
              <label className="form-label">Cost</label>
              <input type="number" className="form-control" value={it.cost} onChange={(e)=>updateItem(idx, "cost", e.target.value)} />
            </div>
            <div className="col-md-3">
              <button type="button" className="btn btn-outline-danger" onClick={()=>removeItem(idx)}>Remove</button>
            </div>
          </div>
        ))}
        <button type="button" className="btn btn-secondary me-2" onClick={addRow}>Add Item</button>
        <button type="button" className="btn btn-primary" onClick={submitToAdmin}>Send to Administrator</button>
      </div>
    </div>
  );
}