"use client";
import SelectField from "@/components/ui/select-field";
import { FormItem } from "@/types/form";

type ComponentProps = {
  question: FormItem;
  onChange: (value: string) => void;
};

const Dropdown: React.FC<ComponentProps> = ({ question, onChange }) => {
  return (
    <SelectField
      placeholder={question.placeholder || "Select a value"}
      value={question.answer || ""}
      onChange={(value: string) => onChange(value)}
      options={(question?.settings?.list_values || [])
        .map((item: any) => ({
          label: item.label,
          value: item.label,
        }))
        .filter((item: any) => item.value)}
    />
  );
};

export default Dropdown;
