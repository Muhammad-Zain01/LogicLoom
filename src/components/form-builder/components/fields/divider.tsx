"use client";
import { Separator } from "@/components/ui/separator";
import { FormItem } from "@/types/form";

type ComponentProps = {
  question?: FormItem;
};

const Divider: React.FC<ComponentProps> = ({ question }) => {
  const color = question?.settings?.color;
  return (
    <Separator
      className="h-[2px] bg-red-300"
      style={{ background: color ? color : "#d6d6d6" }}
    />
  );
};

export default Divider;
