import { useState } from "react";
import { AuthAPI } from "../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "", role:"Homeowner"});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await AuthAPI.register(form);
      navigate("/login");
    } catch (e) {
      setError("Registration failed",e);
      console.log(e);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <form className="card p-4" onSubmit={submit}>
          <h4>Register</h4>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <input className="form-control" value={form.username} onChange={(e)=>setForm({...form,username:e.target.value})} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Role</label>
              <select className="form-control" value={form.role} onChange={(e)=>setForm({...form,role:e.target.value})}>
                <option>Homeowner</option>
                <option>Interior Designer</option>
                <option>Contractor</option>
                <option>Administrator</option>
              </select>
            </div>
          </div>
          <button className="btn btn-success mt-3">Create Account</button>
        </form>
      </div>
    </div>
  );
}
