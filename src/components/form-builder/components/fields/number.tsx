"use client";
import { Input } from "@/components/ui/input";
import { FormItem } from "@/types/form";

type ComponentProps = {
  question: FormItem;
};

const Number: React.FC<ComponentProps> = ({ question }) => {
  return (
    <Input
      type="number"
      placeholder={question.placeholder || "Enter your number"}
    />
  );
};

export default Number;
