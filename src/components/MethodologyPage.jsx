export default function MethodologyPage() {
  return (
    <div className="card p-4">
      <h3>Estimation Methodology</h3>
      <p>Our estimates use simple transparent formulas so you can see how costs are built:</p>
      <ul>
        <li><strong>Total Estimate</strong> = Σ(Material Cost × Quantity) + Σ(Labor Hours × Rate) + Appliance Cost + Miscellaneous</li>
        <li><strong>Cabinetry</strong> = (Unit Price × Number of Cabinets) + Installation Labor</li>
        <li><strong>Flooring</strong> = (₹/sq.ft × Area) + Labor</li>
        <li><strong>Electrical</strong> = (Fixture Price × Quantity) + Wiring Labor</li>
      </ul>
      <div className="alert alert-info mt-3">
        Tip: The biggest cost drivers are area (for flooring/countertops), material grade, and labor hours.
      </div>
      <div className="row mt-3">
        <div className="col-md-6">
          <div className="card p-3 h-100">
            <h5 className="mb-2">Cost Drivers (Example)</h5>
            <div className="progress mb-2">
              <div className="progress-bar" style={{width: "45%"}}>Materials 45%</div>
            </div>
            <div className="progress mb-2">
              <div className="progress-bar bg-success" style={{width: "35%"}}>Labor 35%</div>
            </div>
            <div className="progress">
              <div className="progress-bar bg-secondary" style={{width: "20%"}}>Appliances 20%</div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card p-3 h-100">
            <h5>Assumptions</h5>
            <ul className="mb-0">
              <li>Standard site access, no structural changes.</li>
              <li>Labor rates vary by location and skill.</li>
              <li>Contingency & taxes not included unless shown.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
