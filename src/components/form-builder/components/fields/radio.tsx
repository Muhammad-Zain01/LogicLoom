import React, { useState, useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { FormItem } from "@/types/form";

type ComponentProps = {
  question: FormItem;
  onChange: (value: string) => void;
};

const RadioItem: React.FC<ComponentProps> = ({ question, onChange }) => {
  const list_values = question?.settings?.list_values;
  const [selectedValue, setSelectedValue] = useState<string>("");

  useEffect(() => {
    if (question.answer) {
      setSelectedValue(question.answer);
    }
  }, [question.answer]);

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <div className="flex flex-col space-y-2">
      {question.description && (
        <p className="text-sm text-gray-500">{question.description}</p>
      )}
      {list_values && list_values.length > 0 ? (
        <RadioGroup
          value={selectedValue}
          onValueChange={handleRadioChange}
          className="flex flex-col space-y-2"
        >
          {list_values.map((value: { label: string }, index: number) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem
                value={value.label}
                id={`${question.id}-${index}`}
              />
              <Label htmlFor={`${question.id}-${index}`}>{value.label}</Label>
            </div>
          ))}
        </RadioGroup>
      ) : (
        <p className="text-center text-gray-400 text-xs">No Values Found</p>
      )}
    </div>
  );
};

export default RadioItem;
