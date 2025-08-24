import { useState } from "react";

export default function CountertopSelector({ onSelect }) {
  const [item, setItem] = useState({
    material: "Granite",
    edge: "Straight",
    thickness: "20mm",
    area: 0,
    pricePerSqft: 0,
  });

  const handle = (e) => setItem({ ...item, [e.target.name]: e.target.value });

  const add = (e) => {
    e.preventDefault();
    onSelect({
      type: "Countertop",
      ...item,
      area: Number(item.area),
      pricePerSqft: Number(item.pricePerSqft),
    });
  };

  return (
    <form className="card p-3 mt-3" onSubmit={add}>
      <h4>Countertop Selector</h4>
      <div className="row g-3">
        <div className="col-md-3">
          <label className="form-label">Material</label>
          <select className="form-control" name="material" value={item.material} onChange={handle}>
            <option>Granite</option>
            <option>Quartz</option>
            <option>Laminate</option>
            <option>Marble</option>
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label">Edge</label>
          <select className="form-control" name="edge" value={item.edge} onChange={handle}>
            <option>Straight</option>
            <option>Beveled</option>
            <option>Ogee</option>
            <option>Round</option>
          </select>
        </div>
        <div className="col-md-2">
          <label className="form-label">Thickness</label>
          <select className="form-control" name="thickness" value={item.thickness} onChange={handle}>
            <option>20mm</option>
            <option>30mm</option>
          </select>
        </div>
        <div className="col-md-2">
          <label className="form-label">Area (sq.ft)</label>
          <input type="number" className="form-control" name="area" value={item.area} onChange={handle} required />
        </div>
        <div className="col-md-2">
          <label className="form-label">Price / sq.ft</label>
          <input type="number" className="form-control" name="pricePerSqft" value={item.pricePerSqft} onChange={handle} required />
        </div>
      </div>
      <button className="btn btn-success mt-3" type="submit">Add Countertop</button>
    </form>
  );
}
