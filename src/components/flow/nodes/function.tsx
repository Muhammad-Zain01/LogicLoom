"use client";
import { Input } from "@/components/ui/input";
import { memo, useCallback, useEffect, useState } from "react";
import {
  Handle,
  Position,
  NodeResizer,
  useStore,
  useReactFlow,
  useNodesState,
} from "reactflow";
import { generateUUID, onPressEnter } from "@/lib/utils";
import { TrashIcon } from "@radix-ui/react-icons";
import { GoDuplicate } from "react-icons/go";
import { PiFunctionBold } from "react-icons/pi";

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

const FunctionNode = ({ id, data, selected }: NodeProps) => {
  console.log(data);
  const minWidth = 350;
  const minHeight = 250;
  const { setNodes } = useReactFlow();
  const [editLabel, setEditLabel] = useState<boolean>(false);
  const connectionNodeId = useStore(connectionNodeIdSelector);
  const [capturing, setCapturing] = useState<boolean>(false);
  const node = useStore((state) => getCurrentNodeData(state, id));
  const { width, height } = node;

  const isConnecting = !!connectionNodeId;
  const isTarget = connectionNodeId && connectionNodeId !== id;

  useEffect(() => {
    selected ? onSelected() : onDeleselected();
  }, [selected]);

  const onSelected = () => {};
  const onDeleselected = () => {
    setEditLabel(false);
  };
  const onChangeVariableName = useCallback(
    (e: any) => {
      try {
        setNodes((nodes: any) => {
          return nodes.map((node: any) => {
            if (node.id === id) {
              return {
                ...node,
                data: { ...(node?.data ?? {}), label: e.target.value },
              };
            }
            return node;
          });
        });
      } catch (e) {
        console.error("Error in onChangeVariableName", e);
      }
    },
    [setNodes, id]
  );
  const onDelete = () => {
    setNodes((nodes) => nodes.filter((node: any) => node.id !== id));
  };
  const onDuplicate = () => {
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
  };

  return (
    <>
      <div
        style={{ width: width ?? minWidth, height: height ?? minHeight }}
        className="bg-[#9c9edf75] flex flex-col items-center border  rounded-lg border-black"
        onDragEnter={() => setCapturing(true)}
        onDragLeave={() => setCapturing(false)}
        onDrop={(e) => {
          console.log(e);
        }}
      >
        <div className="bg-primary flex justify-between items-center w-full p-1 rounded-t-lg">
          <PiFunctionBold className="text-white" />
          <span className="text-white font-mono text-[12px]">function</span>
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

        {/* <div className="flex w-full items-center justify-center h-full">
          <div className={`${capturing ? "text-gray-400" : "text-gray-200"} `}>
            Drop Widgets
          </div>
        </div> */}
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
        <NodeResizer
          color="black"
          isVisible={selected}
          minWidth={minWidth}
          minHeight={minHeight}
        />
      </div>
    </>
  );
};

export default memo(FunctionNode);
