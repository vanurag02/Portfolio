import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import ManageProjects from "./dashboard/ManageProjects";
import ManageSkills from "./dashboard/ManageSkills";
import ManageEducation from "./dashboard/ManageEducation";

const AdminLayout = () => {
  const [activeTab, setActiveTab] = useState("projects");

  const renderTab = () => {
    switch (activeTab) {
      case "projects":
        return <ManageProjects />;
      case "skills":
        return <ManageSkills />;
      case "education":
        return <ManageEducation />;
      default:
        return <ManageProjects />;
    }
  };

  return (
    <div style={{ background: "var(--color-bg)", minHeight: "100vh" }}>
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="ml-60 p-10">{renderTab()}</main>
    </div>
  );
};

export default AdminLayout;
