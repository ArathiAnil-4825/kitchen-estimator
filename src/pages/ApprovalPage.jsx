import React, { useState } from "react";

const ApprovalPage = () => {
  const [status, setStatus] = useState("Pending");
  const [comments, setComments] = useState("");

  const handleApprove = () => {
    setStatus("Approved");
    alert("Bill Approved ✅");
  };

  const handleReject = () => {
    setStatus("Rejected");
    alert("Bill Rejected ❌");
  };

  return (
    <div className="card shadow-sm p-4 mt-4">
      <h3>Bill Approval</h3>

      <div className="mb-3">
        <label className="form-label">Project Name</label>
        <input
          type="text"
          className="form-control"
          value="Kitchen Remodel - Project A"
          disabled
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Total Estimate</label>
        <input
          type="text"
          className="form-control"
          value="$12,500"
          disabled
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Comments</label>
        <textarea
          className="form-control"
          rows="3"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          placeholder="Add revision notes or approval remarks"
        ></textarea>
      </div>

      <div className="d-flex gap-2">
        <button className="btn btn-success" onClick={handleApprove}>
          Approve ✅
        </button>
        <button className="btn btn-danger" onClick={handleReject}>
          Reject ❌
        </button>
      </div>

      <div className="mt-3">
        <span className="fw-bold">Current Status:</span>{" "}
        <span
          className={`badge ${
            status === "Approved"
              ? "bg-success"
              : status === "Rejected"
              ? "bg-danger"
              : "bg-warning text-dark"
          }`}
        >
          {status}
        </span>
      </div>
    </div>
  );
};

export default ApprovalPage;
