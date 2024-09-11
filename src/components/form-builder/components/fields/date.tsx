import React, { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { FormItem } from "@/types/form";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";

type ComponentProps = {
  question: FormItem;
  onChange: (value: string) => void;
};

const DateItem: React.FC<ComponentProps> = ({ question, onChange }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (question.answer) {
      setSelectedDate(new Date(question.answer));
    }
  }, [question.answer]);

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
    onChange(date ? date.toISOString() : "");
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col space-y-2">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={`w-full justify-start text-left font-normal ${!selectedDate && "text-muted-foreground"}`}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateItem;
