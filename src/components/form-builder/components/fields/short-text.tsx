"use client";
import { Input } from "@/components/ui/input";
import { FormItem } from "@/types/form";

type ComponentProps = {
  question: FormItem;
  onChange: (value: string) => void;
};

const ShortText: React.FC<ComponentProps> = ({ question, onChange }) => {
  return (
    <Input
      value={question.answer}
      type="text"
      placeholder={question.placeholder || "Enter your text"}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default ShortText;
