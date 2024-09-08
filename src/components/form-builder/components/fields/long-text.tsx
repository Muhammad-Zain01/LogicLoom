"use client";
import { Textarea } from "@/components/ui/textarea";
import { FormItem } from "@/types/form";

type ComponentProps = {
  question: FormItem;
  onChange: (value: string) => void;
};

const LongText: React.FC<ComponentProps> = ({ question, onChange }) => {
  return (
    <Textarea
      value={question.answer}
      placeholder={question.placeholder || "Enter your long text"}
      rows={5}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default LongText;
