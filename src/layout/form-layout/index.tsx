"use client";
import Sidebar from "./components/sidebar";
import Header from "./components/header";

type LayoutProps = {
  children: React.ReactNode;
};

const FormLayout: React.FC<LayoutProps> = ({ children }): JSX.Element => {
  return (
    <div className="flex h-screen flex-col">
      <div className="h-16 ">
        <Header />
      </div>
      <div className="flex w-full h-[92vh] ">
        <Sidebar />
        <div className="h-full w-full">{children}</div>
      </div>
      <div className="flex justify-center text-sm py-2 text-gray-400 ">
        Copyright © 2024. All rights reserved by{" "}
        <a href="https://github.com/Muhammad-Zain01">
          <strong className="ml-1 underline">Muhammad Zain</strong>
        </a>
        .
      </div>
    </div>
  );
};

export default FormLayout;
