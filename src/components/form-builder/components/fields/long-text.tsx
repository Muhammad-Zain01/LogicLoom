"use client";
import { Textarea } from "@/components/ui/textarea";
import { FormItem } from "@/types/form";

type ComponentProps = {
  question: FormItem;
};

const LongText: React.FC<ComponentProps> = ({ question }) => {
  return (
    <Textarea
      placeholder={question.placeholder || "Enter your long text"}
      rows={5}
    />
  );
};

export default LongText;
