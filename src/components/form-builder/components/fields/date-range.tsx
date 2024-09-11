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

const DateRangeItem: React.FC<ComponentProps> = ({ question, onChange }) => {
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({ from: undefined, to: undefined });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (question.answer) {
      const { from, to } = JSON.parse(question.answer);
      setDateRange({
        from: from ? new Date(from) : undefined,
        to: to ? new Date(to) : undefined,
      });
    }
  }, [question.answer]);

  const handleDateRangeChange = (range: { from: Date | undefined; to: Date | undefined }) => {
    setDateRange(range);
    onChange(JSON.stringify({
      from: range.from?.toISOString(),
      to: range.to?.toISOString(),
    }));
    if (range.from && range.to) {
      setIsOpen(false);
    }
  };

  const formatDateRange = () => {
    if (dateRange.from && dateRange.to) {
      return `${format(dateRange.from, "PPP")} - ${format(dateRange.to, "PPP")}`;
    }
    if (dateRange.from) {
      return `${format(dateRange.from, "PPP")} - ...`;
    }
    return "Select date range";
  };

  return (
    <div className="flex flex-col space-y-2">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={`w-full justify-start text-left font-normal ${
              !dateRange.from && !dateRange.to && "text-muted-foreground"
            }`}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formatDateRange()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            selected={dateRange}
            // @ts-ignore
            onSelect={handleDateRangeChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateRangeItem;
