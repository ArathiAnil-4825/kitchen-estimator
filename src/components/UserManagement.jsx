import { useState } from "react";
// import { AdminAPI } from "../api"; // enable when backend is ready

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", role: "Homeowner" });

  const add = async (e) => {
    e.preventDefault();
    const row = { ...form, id: crypto.randomUUID() };
    // await AdminAPI.users.create(row)
    setUsers((prev) => [...prev, row]);
    setForm({ name: "", email: "", role: "Homeowner" });
  };

  return (
    <div className="card p-3">
      <h5>User Management</h5>
      <form className="row g-2" onSubmit={add}>
        <div className="col-md-3">
          <input className="form-control" placeholder="Name" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})}/>
        </div>
        <div className="col-md-3">
          <input type="email" className="form-control" placeholder="Email" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})}/>
        </div>
        <div className="col-md-3">
          <select className="form-control" value={form.role} onChange={(e)=>setForm({...form,role:e.target.value})}>
            <option>Homeowner</option>
            <option>Interior Designer</option>
            <option>Contractor</option>
            <option>Administrator</option>
          </select>
        </div>
        <div className="col-md-3">
          <button className="btn btn-primary w-100">Add User</button>
        </div>
      </form>

      <div className="table-responsive mt-3">
        <table className="table table-striped">
          <thead><tr><th>Name</th><th>Email</th><th>Role</th></tr></thead>
          <tbody>
            {users.map((u)=>(
              <tr key={u.id}><td>{u.name}</td><td>{u.email}</td><td>{u.role}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
