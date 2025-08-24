import { useState } from "react";

export default function LightingSelector({ onAdd }) {
  const [state, setState] = useState({
    fixtureType: "Recessed",
    fixturePrice: 40,
    quantity: 4,
    wiringHours: 5,
    laborRate: 30,
  });

  const handle = (e) => setState({ ...state, [e.target.name]: e.target.value });

  const add = (e) => {
    e.preventDefault();
    const total =
      Number(state.quantity) * Number(state.fixturePrice) +
      Number(state.wiringHours) * Number(state.laborRate);
    onAdd({ type: "Electrical", ...state, total });
  };

  return (
    <form className="card p-3 mt-3" onSubmit={add}>
      <h4>Lighting & Electrical</h4>
      <div className="row g-3">
        <div className="col-md-3">
          <label className="form-label">Fixture Type</label>
          <select name="fixtureType" className="form-control" value={state.fixtureType} onChange={handle}>
            <option>Recessed</option>
            <option>Pendant</option>
            <option>Under-cabinet</option>
          </select>
        </div>
        <div className="col-md-2">
          <label className="form-label">Fixture Price</label>
          <input className="form-control" type="number" name="fixturePrice" value={state.fixturePrice} onChange={handle} />
        </div>
        <div className="col-md-2">
          <label className="form-label">Quantity</label>
          <input className="form-control" type="number" name="quantity" value={state.quantity} onChange={handle} />
        </div>
        <div className="col-md-2">
          <label className="form-label">Wiring Hours</label>
          <input className="form-control" type="number" name="wiringHours" value={state.wiringHours} onChange={handle} />
        </div>
        <div className="col-md-2">
          <label className="form-label">Labor Rate</label>
          <input className="form-control" type="number" name="laborRate" value={state.laborRate} onChange={handle} />
        </div>
      </div>
      <button className="btn btn-success mt-3">Add Electrical</button>
    </form>
  );
}
