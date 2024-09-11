import React, { useState, useEffect } from "react";
import { FormItem } from "@/types/form";
import { Button } from "@/components/ui/button";
import { ClockIcon } from "@radix-ui/react-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ComponentProps = {
  question: FormItem;
  onChange: (value: string) => void;
};

const TimeItem: React.FC<ComponentProps> = ({ question, onChange }) => {
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined
  );
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (question.answer) {
      setSelectedTime(question.answer);
    }
  }, [question.answer]);

  const handleTimeChange = (value: string) => {
    setSelectedTime(value);
    onChange(value);
    setIsOpen(false);
  };

  const generateTimeOptions = () => {
    const options = [];
    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < 60; j += 30) {
        options.push(
          <SelectItem
            key={`${i}:${j}`}
            value={`${i.toString().padStart(2, "0")}:${j
              .toString()
              .padStart(2, "0")}`}
          >
            {`${i.toString().padStart(2, "0")}:${j
              .toString()
              .padStart(2, "0")}`}
          </SelectItem>
        );
      }
    }
    return options;
  };

  return (
    <div className="flex flex-col space-y-2">
      <Select onValueChange={handleTimeChange} value={selectedTime}>
        <SelectTrigger>
          <SelectValue placeholder="Select time" />
        </SelectTrigger>
        <SelectContent>{generateTimeOptions()}</SelectContent>
      </Select>
    </div>
  );
};

export default TimeItem;
