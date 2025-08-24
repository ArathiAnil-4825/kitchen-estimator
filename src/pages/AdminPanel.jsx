import SupplierManagement from "../components/SupplierManagement";
import UserManagement from "../components/UserManagement";

export default function AdminPanel() {
  return (
    <div>
      <h3 className="mb-3">Admin Panel</h3>
      <div className="row g-3">
        <div className="col-12">
          <SupplierManagement />
        </div>
        <div className="col-12">
          <UserManagement />
        </div>
      </div>
    </div>
  );
}
