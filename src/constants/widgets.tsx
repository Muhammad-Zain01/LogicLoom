import { TbVariable } from "react-icons/tb";
import { PiFunctionBold } from "react-icons/pi";
import { TbBinaryTree2 } from "react-icons/tb";
import { MdLoop } from "react-icons/md";
import { LuCircleDot } from "react-icons/lu";

export const Widgets = [
  {
    label: "Node",
    type: "variable_node",
    icon: (
      <LuCircleDot className="h-7 w-7 text-gray-500 dark:text-gray-400 mb-1" />
    ),
  },
  // {
  //   label: "Function",
  //   type: "function_node",
  //   icon: (
  //     <PiFunctionBold className="h-7 w-7 text-gray-500 dark:text-gray-400 mb-1" />
  //   ),
  // },
  // {
  //   label: "Condition",
  //   type: "condition_node",
  //   icon: (
  //     <TbBinaryTree2 className="h-7 w-7 text-gray-500 dark:text-gray-400 mb-1" />
  //   ),
  // },
  // {
  //   label: "Loop",
  //   type: "loop_node",
  //   icon: <MdLoop className="h-7 w-7 text-gray-500 dark:text-gray-400 mb-1" />,
  // },
];
