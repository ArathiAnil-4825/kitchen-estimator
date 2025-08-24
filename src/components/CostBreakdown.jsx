export default function CostBreakdown({ components }) {
  return (
    <div className="card p-3 mt-3">
      <h4>Cost Breakdown</h4>
      <ul>
        {components.map((c, index) => (
          <li key={index}>
            {c.type}: {c.material} - {c.quantity} units
          </li>
        ))}
      </ul>
    </div>
  );
}
