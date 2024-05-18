"use client";
import { Input } from "@/components/ui/input";
import { memo, useCallback, useState } from "react";
import { TbVariable } from "react-icons/tb";
import {
  Handle,
  Position,
  NodeResizer,
  useStore,
  useReactFlow,
} from "reactflow";
import { onPressEnter } from "@/lib/utils";
import { TrashIcon } from "@radix-ui/react-icons";
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

const VariableNode = ({ id, data, selected }: NodeProps) => {
  const minWidth = 220;
  const minHeight = 80;
  const { setNodes } = useReactFlow();
  const [editLabel, setEditLabel] = useState<boolean>(false);
  const connectionNodeId = useStore(connectionNodeIdSelector);
  const { width, height } = useStore((state) => getCurrentNodeData(state, id));

  const isConnecting = !!connectionNodeId;
  const isTarget = connectionNodeId && connectionNodeId !== id;

  const onChangeVariableName = useCallback(
    (e: any) => {
      setNodes((nodes: any) => {
        return nodes.map((node: any) => {
          if (node.id === id) {
            return {
              ...node,
              data: { ...(node?.data ?? {}), label: e.target.value },
            };
          }
        });
      });
    },
    [setNodes, id]
  );
  const onSaveVariable = () => {
    console.log("sdf");
  };

  return (
    <>
      <div
        style={{ width: width ?? minWidth, height: height ?? minHeight }}
        className="bg-white flex flex-col items-center border  rounded-lg border-black"
      >
        <div className="bg-primary flex justify-between items-center w-full p-1 rounded-t-lg">
          <TbVariable className="text-white" />
          <span className="text-white font-mono text-[12px]">variable</span>
          <div className="flex">
            <TrashIcon className="text-white" />
          </div>
        </div>

        <div className="flex w-full items-center justify-center h-full">
          <NodeResizer
            color="black"
            isVisible={selected}
            minWidth={220}
            minHeight={80}
          />
          <Handle type="target" position={Position.Top} id="a" />
          <Handle type="target" position={Position.Right} id="b" />
          {editLabel ? (
            <div className="w-full mx-3">
              <Input
                value={data?.label ?? ""}
                placeholder="Enter Variable Name"
                onChange={onChangeVariableName}
                onKeyDown={(e) => onPressEnter(e, () => setEditLabel(false))}
              />
            </div>
          ) : (
            <div
              className="w-full mx-3 hover:border text-center cursor-pointer py-1 rounded"
              onClick={() => setEditLabel(true)}
            >
              {" "}
              {data.label ?? "x"}
            </div>
          )}
          <Handle type="source" position={Position.Bottom} id="c" />
          <Handle type="source" position={Position.Left} id="d" />
        </div>
      </div>
    </>
  );
};

export default memo(VariableNode);
