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
import { Button } from "@/components/ui/button";
import { MdAddLink } from "react-icons/md";

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
  // console.log(data);
  const minWidth = 220;
  const minHeight = 80;
  const { setNodes } = useReactFlow();
  const [editLabel, setEditLabel] = useState<boolean>(false);
  const connectionNodeId = useStore(connectionNodeIdSelector);
  const node = useStore((state) => getCurrentNodeData(state, id));
  const { width, height, extent } = node;

  const nodes = useStore((state) => state.getNodes());
  const showPopup = useMemo(() => {
    if (data.intersections && data.intersections.length && extent != "parent") {
      const curr_intersaction_id = data?.intersections[0];
      return nodes.find((node: any) =>
        node.id == curr_intersaction_id && node.type == "function_node"
          ? true
          : false
      )
        ? true
        : false;
    }
    return false;
  }, [nodes, data.intersections, extent]);
  console.log(nodes);

  const isConnecting = !!connectionNodeId;
  const isTarget = connectionNodeId && connectionNodeId !== id;

  useEffect(() => {}, [data?.intersections]);

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

  const AttachWidget = () => {
    setNodes((nodes) => {
      return nodes.map((node: any) => {
        console.log(nodes);
        if (node.id === id) {
          // console.log(data.intersections[0])
          return {
            ...node,
            position: { x: 0, y: 0 },
            extent: "parent",
            parentId: data.intersections[0],
          };
        }
        return node;
      });
    });
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
        className="bg-white flex flex-col items-center border  rounded-lg border-black"
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
          <TbVariable className="text-white" />
          <span className="text-white font-mono text-[12px]">variable</span>
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

        <div className="flex w-full items-center justify-center h-full">
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
        </div>
      </div>
    </>
  );
};

export default memo(VariableNode);
