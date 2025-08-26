export default function Home() {
  return (
    <div className="text-center">
      <h1>Kitchen Construction Estimator</h1>
      <p>Plan kitchen construction or renovation, collaborate, and track total costs.</p>
      <div className="mt-3">
        <a className="btn btn-primary me-2" href="/login">Login</a>
        <a className="btn btn-outline-secondary" href="/register">Register</a>
      </div>
    </div>
  );
}
