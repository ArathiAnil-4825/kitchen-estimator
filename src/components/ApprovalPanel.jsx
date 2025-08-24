import { useState } from "react";
// import { ProjectAPI } from "../api"; // enable when backend is ready

export default function ApprovalPanel({ project }) {
  const [status, setStatus] = useState(project?.status || "Draft");
  const [comment, setComment] = useState("");

  const submit = async () => {
    try {
      // await ProjectAPI.submitForApproval(project._id);
      setStatus("Pending");
    } catch (e) {
      alert("Failed to submit for approval.");
    }
  };

  const simulateReview = (newStatus) => {
    // In real app, only Contractor/Admin can do this
    setStatus(newStatus);
  };

  return (
    <div className="card p-3 mt-3">
      <h4>Bill Approval Workflow</h4>
      <p>Status: <span className={`badge ${status === "Approved" ? "bg-success" : status === "Rejected" ? "bg-danger" : "bg-warning text-dark"}`}>{status}</span></p>
      <div className="mb-3">
        <label className="form-label">Comment / Revision Request</label>
        <textarea className="form-control" rows="2" value={comment} onChange={(e)=>setComment(e.target.value)} />
      </div>
      <div className="d-flex gap-2">
        <button className="btn btn-primary" onClick={submit}>Submit for Approval</button>
        <button className="btn btn-success" onClick={() => simulateReview("Approved")}>Approve (simulate)</button>
        <button className="btn btn-danger" onClick={() => simulateReview("Rejected")}>Reject (simulate)</button>
      </div>
    </div>
  );
}
