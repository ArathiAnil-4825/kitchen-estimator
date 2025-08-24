import { useState } from "react";
// import { AdminAPI } from "../api"; // enable when backend is ready

export default function SupplierManagement() {
  const [materials, setMaterials] = useState([]);
  const [products, setProducts] = useState([]);
  const [laborRates, setLaborRates] = useState([]);

  const [matForm, setMatForm] = useState({ category: "Cabinetry", name: "", price: "" });
  const [prodForm, setProdForm] = useState({ type: "Appliance", name: "", price: "" });
  const [laborForm, setLaborForm] = useState({ role: "Installation", rate: "" });

  const addMaterial = async (e) => {
    e.preventDefault();
    const row = { ...matForm, price: Number(matForm.price) };
    // await AdminAPI.materials.create(row);
    setMaterials((prev) => [...prev, row]);
    setMatForm({ category: "Cabinetry", name: "", price: "" });
  };

  const addProduct = async (e) => {
    e.preventDefault();
    const row = { ...prodForm, price: Number(prodForm.price) };
    // await AdminAPI.products.create(row);
    setProducts((prev) => [...prev, row]);
    setProdForm({ type: "Appliance", name: "", price: "" });
  };

  const addLabor = async (e) => {
    e.preventDefault();
    const row = { ...laborForm, rate: Number(laborForm.rate) };
    // await AdminAPI.laborRates.create(row);
    setLaborRates((prev) => [...prev, row]);
    setLaborForm({ role: "Installation", rate: "" });
  };

  return (
    <div className="row">
      <div className="col-lg-4">
        <form className="card p-3 mb-3" onSubmit={addMaterial}>
          <h5>Add Material</h5>
          <select className="form-control mb-2" value={matForm.category} onChange={(e)=>setMatForm({...matForm,category:e.target.value})}>
            <option>Cabinetry</option><option>Countertops</option><option>Flooring</option><option>Backsplash</option>
          </select>
          <input className="form-control mb-2" placeholder="Name" value={matForm.name} onChange={(e)=>setMatForm({...matForm,name:e.target.value})}/>
          <input className="form-control mb-2" placeholder="Price" type="number" value={matForm.price} onChange={(e)=>setMatForm({...matForm,price:e.target.value})}/>
          <button className="btn btn-success">Save Material</button>
        </form>
      </div>

      <div className="col-lg-4">
        <form className="card p-3 mb-3" onSubmit={addProduct}>
          <h5>Add Product</h5>
          <select className="form-control mb-2" value={prodForm.type} onChange={(e)=>setProdForm({...prodForm,type:e.target.value})}>
            <option>Appliance</option><option>Sink</option><option>Faucet</option><option>Hardware</option>
          </select>
          <input className="form-control mb-2" placeholder="Name" value={prodForm.name} onChange={(e)=>setProdForm({...prodForm,name:e.target.value})}/>
          <input className="form-control mb-2" placeholder="Price" type="number" value={prodForm.price} onChange={(e)=>setProdForm({...prodForm,price:e.target.value})}/>
          <button className="btn btn-success">Save Product</button>
        </form>
      </div>

      <div className="col-lg-4">
        <form className="card p-3 mb-3" onSubmit={addLabor}>
          <h5>Add Labor Rate</h5>
          <select className="form-control mb-2" value={laborForm.role} onChange={(e)=>setLaborForm({...laborForm,role:e.target.value})}>
            <option>Installation</option><option>Demolition</option><option>Plumbing</option><option>Electrical</option>
          </select>
          <input className="form-control mb-2" placeholder="Rate (₹/hour)" type="number" value={laborForm.rate} onChange={(e)=>setLaborForm({...laborForm,rate:e.target.value})}/>
          <button className="btn btn-success">Save Rate</button>
        </form>
      </div>

      <div className="col-12">
        <div className="card p-3">
          <h5 className="mb-3">Current Catalog</h5>
          <div className="row g-3">
            <div className="col-md-4">
              <h6>Materials</h6>
              <ul className="list-group">
                {materials.map((m, i)=>(<li key={i} className="list-group-item d-flex justify-content-between">
                  <span>{m.category} - {m.name}</span><span>₹{m.price}</span>
                </li>))}
              </ul>
            </div>
            <div className="col-md-4">
              <h6>Products</h6>
              <ul className="list-group">
                {products.map((p, i)=>(<li key={i} className="list-group-item d-flex justify-content-between">
                  <span>{p.type} - {p.name}</span><span>₹{p.price}</span>
                </li>))}
              </ul>
            </div>
            <div className="col-md-4">
              <h6>Labor Rates</h6>
              <ul className="list-group">
                {laborRates.map((l, i)=>(<li key={i} className="list-group-item d-flex justify-content-between">
                  <span>{l.role}</span><span>₹{l.rate}/hr</span>
                </li>))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
