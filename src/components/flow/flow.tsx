"use client";
import React, { useState, useRef, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
} from "reactflow";
import "reactflow/dist/style.css";
import allNodes from "@/constants/nodes";
import Sidebar from "./sidebar";
import { generateUUID } from "@/lib/utils";
import VariableNode from "@/components/flow/nodes/variable";
import SimpleFloatingEdge from "./edge/floating-edge";

const nodeTypes = {
  VariableNode,
};
const edgeTypes = {
  floating: SimpleFloatingEdge,
};

const Flow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      console.log(type);
      const newNode = {
        id: generateUUID(),
        type: type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  return (
    <>
      <ReactFlowProvider>
        <div className="flex flex-row h-[100vh] flex-1">
          <Sidebar />
          <div
            className="border-2 w-full"
            ref={reactFlowWrapper}
            style={{ height: "100%" }}
          >
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={(params) => {
                console.log(params);
                onEdgesChange(params);
              }}
              onConnect={(params) => {
                onConnect({
                  ...params,
                  label: "tes",
                  type: "smooth",
                  animated: true,
                });
              }}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              fitView
              snapGrid={[30, 30]}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
            >
              <Controls />
            </ReactFlow>
          </div>
        </div>
      </ReactFlowProvider>
    </>
  );
};

export default Flow;
