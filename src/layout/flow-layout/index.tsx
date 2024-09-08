"use client";
import Sidebar from "./components/sidebar";
import Header from "./components/header";

type LayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout: React.FC<LayoutProps> = ({ children }): JSX.Element => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col w-full ">
        <Header />
        <div className="p-6 h-full ">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
