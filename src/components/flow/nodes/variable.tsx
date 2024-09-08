"use client";
import { Input } from "@/components/ui/input";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { TbVariable } from "react-icons/tb";
import {
  Handle,
  Position,
  NodeResizer,
  useStore,
  useReactFlow,
  NodeToolbar,
} from "reactflow";
import { generateUUID, onPressEnter } from "@/lib/utils";
import { TrashIcon } from "@radix-ui/react-icons";
import { GoDuplicate } from "react-icons/go";
import { MdAddLink } from "react-icons/md";
import { Textarea } from "@/components/ui/textarea";

const connectionNodeIdSelector = (state: any) => state.connectionNodeId;
const getCurrentNodeData = (state: any, id: string) => {
  const nodes = state.getNodes();
  return nodes ? nodes.find((node: any) => node.id === id) ?? {} : {};
};

type NodeProps = {
  id: string;
  data: any;
  selected: boolean;
};

const VariableNode = memo(({ id, data, selected }: NodeProps) => {
  const minWidth = 220;
  const minHeight = 120;
  const { setNodes } = useReactFlow();
  const [editLabel, setEditLabel] = useState<boolean>(false);
  const [variableName, setVariableName] = useState<string>(data.label || "");
  const connectionNodeId = useStore(connectionNodeIdSelector);
  const node = useStore((state) => getCurrentNodeData(state, id));
  const { width, height, extent } = node;

  const nodes = useStore((state) => state.getNodes());
  const showPopup = useMemo(() => {
    if (data.intersections && data.intersections.length && extent !== "parent") {
      const curr_intersection_id = data?.intersections[0];
      return nodes.some((node: any) =>
        node.id === curr_intersection_id && node.type === "function_node"
      );
    }
    return false;
  }, [nodes, data.intersections, extent]);

  useEffect(() => {
    if (selected) {
      // Handle selection
    } else {
      setEditLabel(false);
    }
  }, [selected]);

  const onChangeVariableName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setVariableName(newName);
    setNodes((nodes: any) => nodes.map((node: any) =>
      node.id === id ? { ...node, data: { ...node.data, label: newName } } : node
    ));
  }, [setNodes, id]);

  const onDelete = useCallback(() => {
    setNodes((nodes) => nodes.filter((node: any) => node.id !== id));
  }, [setNodes, id]);

  const AttachWidget = useCallback(() => {
    setNodes((nodes) => nodes.map((node: any) =>
      node.id === id ? {
        ...node,
        position: { x: 0, y: 0 },
        extent: "parent",
        parentId: data.intersections[0],
      } : node
    ));
  }, [setNodes, id, data.intersections]);

  const onDuplicate = useCallback(() => {
    setNodes((nodes) => [
      ...nodes,
      {
        ...node,
        selected: false,
        id: generateUUID(),
        position: {
          x: node.position.x + 30,
          y: node.position.y + 30,
        },
      },
    ]);
  }, [setNodes, node]);

  return (
    <div
      style={{ width: width ?? minWidth, height: height ?? minHeight }}
      className="bg-white flex flex-col items-center border rounded-lg border-black"
    >
      <NodeToolbar isVisible={showPopup}>
        <div className="bg-white rounded-lg p-1 border shadow">
          <MdAddLink
            size={20}
            className="cursor-pointer"
            onClick={AttachWidget}
          />
        </div>
      </NodeToolbar>
      <div className="bg-primary flex justify-between items-center w-full p-1 rounded-t-lg">
        <span className="text-white font-mono text-[12px] ml-1">
          Node
        </span>
        <div className="flex">
          <GoDuplicate
            className="text-white mr-1 cursor-pointer"
            onClick={onDuplicate}
          />
          <TrashIcon
            className="text-white cursor-pointer"
            onClick={onDelete}
          />
        </div>
      </div>

      <div className="flex w-full items-center justify-center h-full overflow-hidden">
        <NodeResizer
          color="black"
          isVisible={selected}
          minWidth={minWidth}
          minHeight={minHeight}
        />
        <Handle
          type="target"
          position={Position.Top}
          className="w-[20px] !bg-teal-500"
        />
        <Handle
          type="source"
          position={Position.Bottom}
          className="w-16 !bg-teal-500"
        />
        {editLabel ? (
          <div className="w-full p-2 h-full text-xs">
            <Textarea
              className="h-full text-xs"
              value={data?.label ?? ""}
              placeholder="Enter Variable Name"
              onChange={(e) => onChangeVariableName(e as any)}
              onKeyDown={(e) => onPressEnter(e, () => setEditLabel(false))}
            />
          </div>
        ) : (
          <div
            className="w-full m-2 p-2 h-[95%] hover:border text-xs cursor-pointer rounded"
            onClick={() => setEditLabel(true)}
          >
            {data.label ?? "x"}
          </div>
        )}
      </div>
    </div>
  );
});

VariableNode.displayName = "VariableNode";

export default VariableNode;
