export default function SummaryReport({ project, components }) {
  const lines = components.map((c) => {
    // calculate a best-effort line total for display
    if (c.total) return c.total;
    if (c.type === "Flooring") return (c.materialCost || 0) + (c.laborCost || 0);
    if (c.type === "Countertop") return Number(c.area) * Number(c.pricePerSqft || 0);
    if (c.type === "Appliance") return Number(c.total || c.price || 0);
    if (c.type === "Cabinet") return Number(c.quantity || 0) * 150; // fallback estimate
    return 0;
  });

  const subtotal = lines.reduce((a, b) => a + (Number.isFinite(b) ? Number(b) : 0), 0);
  const tax = +(subtotal * 0.09).toFixed(2);
  const total = +(subtotal + tax).toFixed(2);

  const printReport = () => window.print();

  return (
    <div className="card p-3 mt-3">
      <h4>Summary Report</h4>
      <p><strong>Project:</strong> {project?.name} &nbsp; | &nbsp; <strong>Location:</strong> {project?.location}</p>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="table-light">
            <tr><th>Category</th><th>Details</th><th className="text-end">Line Total (₹)</th></tr>
          </thead>
          <tbody>
            {components.map((c, i) => (
              <tr key={i}>
                <td><span className="badge bg-secondary">{c.type}</span></td>
                <td>
                  <small className="text-muted">
                    {Object.entries(c)
                      .filter(([k]) => !["type", "total", "materialCost", "laborCost"].includes(k))
                      .map(([k, v]) => `${k}: ${v}`)
                      .join(" | ")
                    }
                  </small>
                </td>
                <td className="text-end">{(lines[i] || 0).toFixed(2)}</td>
              </tr>
            ))}
            <tr>
              <td colSpan="2" className="text-end"><strong>Subtotal</strong></td>
              <td className="text-end"><strong>₹{subtotal.toFixed(2)}</strong></td>
            </tr>
            <tr>
              <td colSpan="2" className="text-end">Tax (9%)</td>
              <td className="text-end">₹{tax.toFixed(2)}</td>
            </tr>
            <tr className="table-success">
              <td colSpan="2" className="text-end"><strong>Grand Total</strong></td>
              <td className="text-end"><strong>₹{total.toFixed(2)}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
      <button className="btn btn-outline-primary" onClick={printReport}>Print / Export PDF</button>
    </div>
  );
}
