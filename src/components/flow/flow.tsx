"use client";
import React, { useState, useCallback } from "react";
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
} from "reactflow";
import "reactflow/dist/style.css";
import { generateUUID } from "@/lib/utils";
import VariableNode from "@/components/flow/nodes/variable";
import SimpleFloatingEdge from "./edge/floating-edge";
import FlowWrapper from "./components/flow-wrapper";
import SampleNode from "./nodes/sample_node";

const nodeTypes = {
  variable_node: VariableNode,
  sample_node: SampleNode,
};
const edgeTypes = {
  floating: SimpleFloatingEdge,
};

const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<any>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<any>([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  const onConnect = useCallback(
    (params: any) => {
      const updatedParams = {
        ...params,
        label: "label",
        type: "floating",
        animated: true,
      };

      setEdges((eds) => addEdge(updatedParams, eds));
    },
    // eslint-disable-next-line
    []
  );

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: any) => {
      if (reactFlowInstance) {
        event.preventDefault();

        const type = event.dataTransfer.getData("application/reactflow");

        if (typeof type === "undefined" || !type) {
          return;
        }

        const position = reactFlowInstance.screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        });
        const newNode = {
          id: generateUUID(),
          type: type,
          position,
          data: { label: `${type} node` },
        };

        setNodes((nds) => nds.concat(newNode));
      }
    },

    // eslint-disable-next-line
    [reactFlowInstance]
  );

  return (
    <FlowWrapper>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={(params) => {
          console.log(params);
          onEdgesChange(params);
        }}
        onConnect={(params) => {
          onConnect(params);
        }}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        fitView
        snapGrid={[30, 30]}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </FlowWrapper>
  );
};

export default Flow;
