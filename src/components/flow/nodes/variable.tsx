"use client";
import { memo } from "react";
import { Handle, Position, NodeResizer } from "reactflow";

const VariableNode = ({ data, selected }) => {
  return (
    <div className=" h-full">
      <NodeResizer
        color="#ff0071"
        isVisible={selected}
        minWidth={100}
        minHeight={30}
      />
      <Handle type="target" position={Position.Top} id="a" />
      <Handle type="target" position={Position.Right} id="b" />
      <div style={{ padding: 10 }}>{data.label}</div>
      <Handle type="source" position={Position.Bottom} id="c" />
      <Handle type="source" position={Position.Left} id="d" />
    </div>
  );
};

export default memo(VariableNode);
