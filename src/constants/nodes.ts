import { generateUUID } from "@/lib/utils";

type Node = {
  id: string;
  type: string;
  position: any;
  data: any;
};
type Nodes = {
  [key: string]: (position?: any, label?: string) => Node;
};

const nodes: Nodes = {
  for_loop: (position: any, label: string) => {
    return {
      id: generateUUID(),
      type: "group",
      position,
      data: { label },
    };
  },
  variable: (position: any, label: string) => {
    return {
      id: generateUUID(),
      type: "input",
      position,
      data: { label },
    };
  },
  if_condition: (position: any, label: string) => {
    return {
      id: generateUUID(),
      type: "input",
      position,
      data: { label },
    };
  },
};

export default nodes;
