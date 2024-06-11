"use client";
import { Separator } from "@/components/ui/separator";
import { FormItem } from "@/types/form";

type ComponentProps = {
  question?: FormItem;
};

const Divider: React.FC<ComponentProps> = ({ question }) => {
  return <Separator />;
};

export default Divider;
