"use client";
import Sidebar from "./components/sidebar";
import Header from "./components/header";

type LayoutProps = {
  children: React.ReactNode;
};

const FormLayout: React.FC<LayoutProps> = ({ children }): JSX.Element => {
  return (
    <div className="flex h-screen flex-col">
      <div className="h-[8vh]">
        <Header />
      </div>
      <div className="flex w-full h-[92vh] ">
        <Sidebar />
        <div className="h-full w-full">{children}</div>
      </div>
    </div>
  );
};

export default FormLayout;
