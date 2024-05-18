"use client";
import { useRef } from "react";
import { ReactFlowProvider } from "reactflow";

type ComponentProps = {
  children: React.ReactNode;
};

const FlowWrapper: React.FC<ComponentProps> = ({ children }) => {
  const reactFlowWrapper = useRef(null);

  return (
    <div className="h-full">
      <ReactFlowProvider>
        <div className=" h-full">
          <div className="flex flex-row h-full flex-1">
            <div
              className="border w-full"
              ref={reactFlowWrapper}
              style={{ height: "100%" }}
            >
              {children}
            </div>
          </div>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default FlowWrapper;
