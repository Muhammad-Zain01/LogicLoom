"use client";
import React from "react";

const ItemWrapper = ({ label, onDragStart }) => {
  return (
    <div
      className="border rounded flex m-1 align-center justify-center py-4"
      onDragStart={onDragStart}
      draggable
    >
      {label}
    </div>
  );
};

const Sidebar = () => {
  const onDragStart = (event: any, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const Items = [
    { label: "Variable", type: "variable_node" },
    { label: "Variable", type: "variable_node" },
    { label: "Variable", type: "variable_node" },
    { label: "Variable", type: "variable_node" },
    { label: "Variable", type: "variable_node" },
    { label: "Variable", type: "variable_node" },
    { label: "Variable", type: "variable_node" },
  ];

  return (
    <aside className="w-[300px]">
      <div className="description">
        You can drag these nodes to the pane on the right.
      </div>
      <div className="grid grid-cols-2 mt-4">
        {Items.map((item, idx) => {
          return (
            <ItemWrapper
              key={idx}
              label={item.label}
              onDragStart={(event: any) => onDragStart(event, item.type)}
            />
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
