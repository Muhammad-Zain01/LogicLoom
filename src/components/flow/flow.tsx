"use client";
import React, { useState, useCallback, useEffect } from "react";
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import { generateUUID } from "@/lib/utils";
import VariableNode from "@/components/flow/nodes/variable";
import FunctionNode from "@/components/flow/nodes/function";
import SimpleFloatingEdge from "./edge/floating-edge";

const nodeTypes = {
  variable_node: VariableNode,
  function_node: FunctionNode,
};
const edgeTypes = {
  floating: SimpleFloatingEdge,
};

const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<any>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<any>([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const { getIntersectingNodes } = useReactFlow();

  useEffect(() => {
    const savedFlow = localStorage.getItem("reactflow");
    if (savedFlow) {
      const flow = JSON.parse(savedFlow);
      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);
    }
  }, [setNodes, setEdges]);

  useEffect(() => {
    if (nodes.length || edges.length) {
      const flow = { nodes, edges };
      localStorage.setItem("reactflow", JSON.stringify(flow));
    }
  }, [nodes, edges]);

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

        const [nodeType, subType] = type.split("|");
        const newNode = {
          id: generateUUID(),
          type: nodeType,
          position,
          data: { subType: subType },
        };

        setNodes((nds) => nds.concat(newNode));
      }
    },

    // eslint-disable-next-line
    [reactFlowInstance]
  );

  const onNodeDrag = useCallback((_: MouseEvent, node: Node) => {
    // @ts-ignore
    const intersections = getIntersectingNodes(node).map((n) => n.id);

    setNodes((ns) =>
      ns.map((n) => {
        if (n.type != "function_node" && n.extent != "parent") {
          return {
            ...n,
            data: { ...n.data, intersections: intersections },
          };
        }
        return n;
      })
    );
    // eslint-disable-next-line
  }, []);

  return (
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
      // @ts-ignore
      onNodeDrag={onNodeDrag}
    >
      <Background />
      <Controls />
    </ReactFlow>
  );
};

export default Flow;
