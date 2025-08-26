import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import Login from "./components/Login";
import Register from "./components/Register";
import MethodologyPage from "./components/MethodologyPage";
import CounterSelector from "./components/CounterSelector";
import ApprovalPage from "./pages/ApprovalPage";
import ContractorInbox from "./pages/ContractorInbox";
import ContractorProject from "./pages/ContractorProject";
import AdminReview from "./pages/AdminReview";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/homeowner" element={<Dashboard />} />
          <Route path="/contractor" element={<ContractorInbox />} />
          <Route path="/contractor/project/:id" element={<ContractorProject />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin-review" element={<AdminReview />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/methodology" element={<MethodologyPage />} />
          <Route path="/counterselector" element={<CounterSelector/>}/>
          <Route path="/approval" element={<ApprovalPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
