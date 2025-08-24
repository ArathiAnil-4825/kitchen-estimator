import { useState } from "react";

export default function PlumbingSelector({ onAdd }) {
  const [item, setItem] = useState({
    sink: "Single Bowl",
    faucet: "Standard",
    sinkQty: 1,
    faucetQty: 1,
    sinkPrice: 200,
    faucetPrice: 120,
    installHours: 4,
    laborRate: 25,
  });

  const handle = (e) => setItem({ ...item, [e.target.name]: e.target.value });

  const add = (e) => {
    e.preventDefault();
    const total =
      Number(item.sinkQty) * Number(item.sinkPrice) +
      Number(item.faucetQty) * Number(item.faucetPrice) +
      Number(item.installHours) * Number(item.laborRate);
    onAdd({ type: "Plumbing", ...item, total });
  };

  return (
    <form className="card p-3 mt-3" onSubmit={add}>
      <h4>Plumbing Selector</h4>
      <div className="row g-3">
        <div className="col-md-3">
          <label className="form-label">Sink</label>
          <select className="form-control" name="sink" value={item.sink} onChange={handle}>
            <option>Single Bowl</option>
            <option>Double Bowl</option>
            <option>Farmhouse</option>
          </select>
        </div>
        <div className="col-md-2">
          <label className="form-label">Sink Qty</label>
          <input className="form-control" type="number" name="sinkQty" value={item.sinkQty} onChange={handle} />
        </div>
        <div className="col-md-2">
          <label className="form-label">Sink Price</label>
          <input className="form-control" type="number" name="sinkPrice" value={item.sinkPrice} onChange={handle} />
        </div>

        <div className="col-md-3">
          <label className="form-label">Faucet</label>
          <select className="form-control" name="faucet" value={item.faucet} onChange={handle}>
            <option>Standard</option>
            <option>Pull-Down</option>
            <option>Touchless</option>
          </select>
        </div>
        <div className="col-md-2">
          <label className="form-label">Faucet Qty</label>
          <input className="form-control" type="number" name="faucetQty" value={item.faucetQty} onChange={handle} />
        </div>
        <div className="col-md-2">
          <label className="form-label">Faucet Price</label>
          <input className="form-control" type="number" name="faucetPrice" value={item.faucetPrice} onChange={handle} />
        </div>

        <div className="col-md-2">
          <label className="form-label">Install Hours</label>
          <input className="form-control" type="number" name="installHours" value={item.installHours} onChange={handle} />
        </div>
        <div className="col-md-2">
          <label className="form-label">Labor Rate</label>
          <input className="form-control" type="number" name="laborRate" value={item.laborRate} onChange={handle} />
        </div>
      </div>
      <button className="btn btn-success mt-3">Add Plumbing</button>
    </form>
  );
}
