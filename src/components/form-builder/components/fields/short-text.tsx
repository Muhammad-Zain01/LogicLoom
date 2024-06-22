"use client";
import { Input } from "@/components/ui/input";
import { FormItem } from "@/types/form";

type ComponentProps = {
  question: FormItem;
};

const ShortText: React.FC<ComponentProps> = ({ question }) => {
  return (
    <Input
      type="text"
      placeholder={question.placeholder || "Enter your text"}
    />
  );
};

export default ShortText;
