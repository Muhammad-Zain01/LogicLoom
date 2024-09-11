import React, { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FormItem } from "@/types/form";

type ComponentProps = {
  question: FormItem;
  onChange: (value: string) => void;
};

const CheckboxItem: React.FC<ComponentProps> = ({ question, onChange }) => {
  const list_values = question?.settings?.list_values;
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  useEffect(() => {
    if (question.answer) {
      setSelectedValues(JSON.parse(question.answer));
    }
  }, [question.answer]);

  const handleCheckboxChange = (label: string, checked: boolean) => {
    let newSelectedValues;
    if (checked) {
      newSelectedValues = [...selectedValues, label];
    } else {
      newSelectedValues = selectedValues.filter((value) => value !== label);
    }
    setSelectedValues(newSelectedValues);
    onChange(JSON.stringify(newSelectedValues));
  };

  return (
    <div className="flex flex-col space-y-2">
      {list_values && list_values.length > 0 ? (
        <div className="flex flex-wrap gap-5">
          {list_values.map((value: { label: string }, index: number) => (
            <div key={index} className="flex items-center space-x-2">
              <Checkbox
                id={`${question.id}-${index}`}
                checked={selectedValues.includes(value.label)}
                onCheckedChange={(checked) =>
                  handleCheckboxChange(value.label, checked as boolean)
                }
              />
              <Label htmlFor={`${question.id}-${index}`}>{value.label}</Label>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400 text-xs">No Values Found</p>
      )}
    </div>
  );
};

export default CheckboxItem;
