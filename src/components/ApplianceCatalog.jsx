import { useState } from "react";

const CATALOG = [
  { type: "Oven", brand: "Bosch", model: "HBL8451UC", price: 900 },
  { type: "Cooktop", brand: "Whirlpool", model: "WFE320M0JS", price: 550 },
  { type: "Refrigerator", brand: "LG", model: "LTCS20020S", price: 800 },
  { type: "Dishwasher", brand: "Samsung", model: "DW80R2031US", price: 450 },
];

export default function ApplianceCatalog({ onAdd }) {
  const [qty, setQty] = useState({});

  const add = (appl) => {
    const q = Number(qty[appl.model] || 1);
    onAdd({ type: "Appliance", ...appl, quantity: q, total: appl.price * q });
  };

  return (
    <div className="card p-3 mt-3">
      <h4>Appliance Catalog</h4>
      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th>Type</th><th>Brand</th><th>Model</th><th>Price</th><th>Qty</th><th></th>
            </tr>
          </thead>
          <tbody>
            {CATALOG.map((a) => (
              <tr key={a.model}>
                <td>{a.type}</td>
                <td>{a.brand}</td>
                <td>{a.model}</td>
                <td>₹{a.price}</td>
                <td style={{maxWidth:100}}>
                  <input type="number" className="form-control" min="1"
                    value={qty[a.model] || 1}
                    onChange={(e) => setQty({ ...qty, [a.model]: e.target.value })}
                  />
                </td>
                <td>
                  <button className="btn btn-primary btn-sm" onClick={() => add(a)}>Add</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
