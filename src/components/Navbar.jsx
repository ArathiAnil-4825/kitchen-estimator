import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "../store";

export default function Navbar() {
  const user = AuthService.currentUser();
  const navigate = useNavigate();

  const logout = () => {
    AuthService.logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">KitchenEstimator</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            {user?.role === "Homeowner" && (
              <li className="nav-item"><Link className="nav-link" to="/homeowner">Homeowner</Link></li>
            )}
            {user?.role === "Contractor" && (
              <li className="nav-item"><Link className="nav-link" to="/contractor">Contractor</Link></li>
            )}
            {user?.role === "Administrator" && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/admin-review">Admin Review</Link></li>
              </>
            )}
            {!user && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
              </>
            )}
            {user && (
              <li className="nav-item">
                <button className="btn btn-outline-light ms-2" onClick={logout}>Logout</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
