import { useAuth } from "../context/AuthContext";
import LoginPage from "../components/admin/LoginPage";
import AdminLayout from "../components/admin/AdminLayout";

const Admin = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div
        className="flex items-center justify-center h-screen"
        style={{ background: "var(--color-bg)" }}
      >
        <div
          className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: "var(--color-primary)" }}
        />
      </div>
    );
  }

  return user ? <AdminLayout /> : <LoginPage />;
};

export default Admin;
