"use client";
import SelectField from "@/components/ui/select-field";
import { FormItem } from "@/types/form";

type ComponentProps = {
  question: FormItem;
};

const Dropdown: React.FC<ComponentProps> = ({ question }) => {
  console.log(
    (question?.settings?.list_values || [])?.map((item: any) => ({
      label: item.label,
      value: item.label,
    }))
  );
  return (
    <SelectField
      placeholder={question.placeholder || "Select a value"}
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
