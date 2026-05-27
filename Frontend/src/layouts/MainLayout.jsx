import React from "react";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  return (
    <>
      <Sidebar />

      <main className="ml-60">{children}</main>

      <Footer />
    </>
  );
};

export default MainLayout;
