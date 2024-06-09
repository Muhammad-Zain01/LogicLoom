import { RiInputField } from "react-icons/ri";
import { FaHeading } from "react-icons/fa6";

const CLASSES = "h-6 w-6 mb-2 text-gray-500 dark:text-gray-400";

export const FormFields = [
  {
    label: "Text",
    type: "text",
    icon: <RiInputField className={CLASSES} />,
  },
  {
    label: "Heading",
    type: "heading",
    icon: <FaHeading className={CLASSES} />,
  },
  {
    label: "Multi line",
    type: "multi_line",
    icon: <RiInputField className={CLASSES} />,
  },
];
