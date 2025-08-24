import { useState } from "react";

export default function ProjectForm({ onSubmit }) {
  const [project, setProject] = useState({ name: "", location: "", dimensions: "" });

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(project);
  };

  return (
    <form onSubmit={handleSubmit} className="card p-3">
      <h4>Create New Project</h4>
      <div className="mb-3">
        <label>Project Name</label>
        <input className="form-control" name="name" value={project.name} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label>Location</label>
        <input className="form-control" name="location" value={project.location} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label>Kitchen Dimensions (sq.ft)</label>
        <input className="form-control" name="dimensions" value={project.dimensions} onChange={handleChange} required />
      </div>
      <button type="submit" className="btn btn-primary">Save Project</button>
    </form>
  );
}
