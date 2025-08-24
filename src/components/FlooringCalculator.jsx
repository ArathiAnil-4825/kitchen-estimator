import { useState } from "react";

export default function FlooringCalculator({ onAdd }) {
  const [state, setState] = useState({
    material: "Tile",
    area: 0,
    pricePerSqft: 0,
    laborPerSqft: 0,
  });

  const handle = (e) => setState({ ...state, [e.target.name]: e.target.value });

  const add = (e) => {
    e.preventDefault();
    const area = Number(state.area);
    const price = Number(state.pricePerSqft);
    const labor = Number(state.laborPerSqft);
    onAdd({
      type: "Flooring",
      ...state,
      area,
      materialCost: area * price,
      laborCost: area * labor,
    });
  };

  return (
    <form className="card p-3 mt-3" onSubmit={add}>
      <h4>Flooring Calculator</h4>
      <div className="row g-3">
        <div className="col-md-3">
          <label className="form-label">Material</label>
          <select className="form-control" name="material" value={state.material} onChange={handle}>
            <option>Tile</option>
            <option>Wood</option>
            <option>Vinyl</option>
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label">Area (sq.ft)</label>
          <input className="form-control" name="area" type="number" value={state.area} onChange={handle} required />
        </div>
        <div className="col-md-3">
          <label className="form-label">Material ₹/sq.ft</label>
          <input className="form-control" name="pricePerSqft" type="number" value={state.pricePerSqft} onChange={handle} required />
        </div>
        <div className="col-md-3">
          <label className="form-label">Labor ₹/sq.ft</label>
          <input className="form-control" name="laborPerSqft" type="number" value={state.laborPerSqft} onChange={handle} required />
        </div>
      </div>
      <button className="btn btn-success mt-3">Add Flooring</button>
    </form>
  );
}
