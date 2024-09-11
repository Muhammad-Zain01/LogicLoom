import React, { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { FormItem } from "@/types/form";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ClockIcon } from "@radix-ui/react-icons";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type ComponentProps = {
  question: FormItem;
  onChange: (value: string) => void;
};

const DateTimeItem: React.FC<ComponentProps> = ({ question, onChange }) => {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (question.answer) {
      setSelectedDateTime(new Date(question.answer));
    }
  }, [question.answer]);

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      const newDateTime = selectedDateTime ? new Date(selectedDateTime) : new Date();
      newDateTime.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
      setSelectedDateTime(newDateTime);
      onChange(newDateTime.toISOString());
    }
  };

  const handleTimeChange = (value: string) => {
    const [hours, minutes] = value.split(':').map(Number);
    const newDateTime = selectedDateTime ? new Date(selectedDateTime) : new Date();
    newDateTime.setHours(hours, minutes);
    setSelectedDateTime(newDateTime);
    onChange(newDateTime.toISOString());
  };

  const generateTimeOptions = () => {
    const options = [];
    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < 60; j += 30) {
        options.push(
          <SelectItem key={`${i}:${j}`} value={`${i.toString().padStart(2, '0')}:${j.toString().padStart(2, '0')}`}>
            {`${i.toString().padStart(2, '0')}:${j.toString().padStart(2, '0')}`}
          </SelectItem>
        );
      }
    }
    return options;
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex space-x-2">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={`w-full justify-start text-left font-normal ${!selectedDateTime && "text-muted-foreground"}`}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDateTime ? format(selectedDateTime, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDateTime}
              onSelect={handleDateChange}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <Select onValueChange={handleTimeChange} value={selectedDateTime ? format(selectedDateTime, "HH:mm") : undefined}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time">
              <div className="flex items-center">
                <ClockIcon className="mr-2 h-4 w-4" />
                {selectedDateTime ? format(selectedDateTime, "HH:mm") : "Select time"}
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {generateTimeOptions()}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default DateTimeItem;
