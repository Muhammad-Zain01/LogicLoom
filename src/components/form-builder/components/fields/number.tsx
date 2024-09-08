"use client";
import { Input } from "@/components/ui/input";
import { FormItem } from "@/types/form";

type ComponentProps = {
  question: FormItem;
  onChange: (value: string) => void;
};

const Number: React.FC<ComponentProps> = ({ question, onChange }) => {
  return (
    <Input
      type="number"
      placeholder={question.placeholder || "Enter your number"}
      value={question.answer || ""}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default Number;
