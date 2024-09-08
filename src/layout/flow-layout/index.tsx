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
        <div className="flex justify-center text-sm py-2 text-gray-400 ">
          Copyright © 2024. All rights reserved by{" "}
          <a href="https://github.com/Muhammad-Zain01">
            <strong className="ml-1 underline">Muhammad Zain</strong>
          </a>
          .
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
