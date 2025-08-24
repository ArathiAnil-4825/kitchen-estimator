import { useState } from "react";
import { AuthAPI } from "../api"; // enable when backend is ready
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "",role: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await AuthAPI.login(form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("token", "demo-token"); // mock
      navigate("/dashboard");
    } catch (e) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-5">
        <form className="card p-4" onSubmit={submit}>
          <h4>Login</h4>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})} required />
          </div>
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  );
}
