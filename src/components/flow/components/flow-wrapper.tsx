"use client";
import { useRef } from "react";
import { ReactFlowProvider } from "reactflow";
import Flow from "../flow";

const FlowWrapper: React.FC = () => {
  const reactFlowWrapper = useRef(null);

  return (
    <div className="flex h-full flex-col">
      <ReactFlowProvider>
        <div className=" h-full">
          <div className="flex flex-row h-full flex-1">
            <div
              className="border w-full"
              ref={reactFlowWrapper}
              style={{ height: "100%" }}
            >
              <Flow />
            </div>
          </div>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default FlowWrapper;
