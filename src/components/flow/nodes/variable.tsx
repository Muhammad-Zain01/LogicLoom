"use client";
import { memo, useCallback, useMemo } from "react";
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
import MusicPlayer from "../components/music-player";
import CountdownTimer from "../components/coundown-timer";
import Text from "../components/text";
import Image from "../components/image";
import FormComponent from "../components/form";
import CodeBlock from "../components/code-block";
import APITest from "../components/api-test";

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
  const { subType } = data;
  const { setNodes } = useReactFlow();
  const node = useStore((state) => getCurrentNodeData(state, id));
  const { width, height, extent } = node;
  const nodes = useStore((state) => state.getNodes());
  const showPopup = useMemo(() => {
    if (
      data.intersections &&
      data.intersections.length &&
      extent !== "parent"
    ) {
      const curr_intersection_id = data?.intersections[0];
      return nodes.some(
        (node: any) =>
          node.id === curr_intersection_id && node.type === "function_node"
      );
    }
    return false;
  }, [nodes, data.intersections, extent]);

  const onDelete = useCallback(() => {
    setNodes((nodes) => nodes.filter((node: any) => node.id !== id));
  }, [setNodes, id]);

  const AttachWidget = useCallback(() => {
    setNodes((nodes) =>
      nodes.map((node: any) =>
        node.id === id
          ? {
              ...node,
              position: { x: 0, y: 0 },
              extent: "parent",
              parentId: data.intersections[0],
            }
          : node
      )
    );
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

  const getMin = () => {
    let minWidth = 220;
    let minHeight = 120;
    let render = null;
    let title = "";
    switch (subType) {
      case "audio":
        minWidth = 220;
        minHeight = 120;
        title = "Audio";
        render = <MusicPlayer id={id} />;
        break;
      case "countdown":
        minWidth = 320;
        minHeight = 220;
        title = "Countdown";
        render = <CountdownTimer id={id} />;
        break;
      case "image":
        minWidth = 320;
        minHeight = 220;
        title = "Countdown";
        // eslint-disable-next-line
        render = <Image id={id} />;
        break;
      case "form":
        minWidth = 400;
        minHeight = 450;
        title = "Form";
        render = <FormComponent />;
        break;
      case "text":
        title = "Text";
        render = <Text />;
        break;
      case "code":
        minWidth = 400;
        minHeight = 330;
        title = "Code Block";
        render = <CodeBlock id={id} />;
        break;
      case "api":
        minWidth = 400;
        minHeight = 600;
        title = "API Testing";
        render = <APITest id={id} />;
        break;
    }
    return {
      minHeight,
      minWidth,
      render,
      title,
    };
  };

  const { minWidth, minHeight, render, title } = getMin();

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
        <span className="text-white font-mono text-[12px] ml-1">{title}</span>
        <div className="flex">
          <GoDuplicate
            className="text-white mr-1 cursor-pointer"
            onClick={onDuplicate}
          />
          <TrashIcon className="text-white cursor-pointer" onClick={onDelete} />
        </div>
      </div>

      <div className="flex  w-full items-center justify-center h-full overflow-hidden">
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
        {render}
      </div>
    </div>
  );
});

VariableNode.displayName = "VariableNode";

export default VariableNode;
