import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Outlet } from "react-router-dom";

export const AppLayout = () => {
  return (
    <div className="container">
      <Header />
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
