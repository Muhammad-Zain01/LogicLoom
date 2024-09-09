import { LuCircleDot } from "react-icons/lu";
import { BsMusicNote } from "react-icons/bs";
import { CodeIcon, ImageIcon, TimerIcon } from "@radix-ui/react-icons";
import { MdTextIncrease } from "react-icons/md";
import { FaWpforms } from "react-icons/fa6";

export const Widgets = [
  {
    label: "Audio",
    type: "variable_node|audio",
    icon: (
      <BsMusicNote className="h-7 w-7 text-gray-500 dark:text-gray-400 mb-1" />
    ),
  },
  {
    label: "Countdown",
    type: "variable_node|countdown",
    icon: (
      <TimerIcon className="h-7 w-7 text-gray-500 dark:text-gray-400 mb-1" />
    ),
  },
  {
    label: "Text",
    type: "variable_node|text",
    icon: (
      <MdTextIncrease className="h-7 w-7 text-gray-500 dark:text-gray-400 mb-1" />
    ),
  },
  {
    label: "Image",
    type: "variable_node|image",
    icon: (
      <ImageIcon className="h-7 w-7 text-gray-500 dark:text-gray-400 mb-1" />
    ),
  },
  {
    label: "Form",
    type: "variable_node|form",
    icon: (
      <FaWpforms className="h-7 w-7 text-gray-500 dark:text-gray-400 mb-1" />
    ),
  },
  {
    label: "Code",
    type: "variable_node|code",
    icon: (
      <CodeIcon className="h-7 w-7 text-gray-500 dark:text-gray-400 mb-1" />
    ),
  },
  {
    label: "API Testing",
    type: "variable_node|api",
    icon: (
      <CodeIcon className="h-7 w-7 text-gray-500 dark:text-gray-400 mb-1" />
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
