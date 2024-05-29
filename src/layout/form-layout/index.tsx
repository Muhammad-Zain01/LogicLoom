"use client";
import Sidebar from "./components/sidebar";
import Header from "./components/header";

type LayoutProps = {
  children: React.ReactNode;
};

const FormLayout: React.FC<LayoutProps> = ({ children }): JSX.Element => {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex w-full h-full ">
        <Sidebar />
        <div className="p-6 h-full w-full">{children}</div>
      </div>
    </div>
  );
};

export default FormLayout;
