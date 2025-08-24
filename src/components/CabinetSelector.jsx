import { useState } from "react";

export default function CabinetSelector({ onSelect }) {
  const [cabinet, setCabinet] = useState({ material: "", style: "", quantity: 0 });

  const handleChange = (e) => {
    setCabinet({ ...cabinet, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSelect(cabinet);
  };

  return (
    <form onSubmit={handleSubmit} className="card p-3 mt-3">
      <h4>Cabinet Selection</h4>
      <div className="mb-3">
        <label>Material</label>
        <select className="form-control" name="material" onChange={handleChange}>
          <option>Wood</option>
          <option>Laminate</option>
          <option>Custom</option>
        </select>
      </div>
      <div className="mb-3">
        <label>Style</label>
        <select className="form-control" name="style" onChange={handleChange}>
          <option>Shaker</option>
          <option>Modern</option>
          <option>Traditional</option>
        </select>
      </div>
      <div className="mb-3">
        <label>Quantity</label>
        <input type="number" className="form-control" name="quantity" onChange={handleChange} />
      </div>
      <button type="submit" className="btn btn-success">Add Cabinet</button>
    </form>
  );
}
