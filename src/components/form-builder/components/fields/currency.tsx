"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SelectField from "@/components/ui/select-field";
import currencies from "@/constants/currencies";
import { useFormStore } from "@/store/form";
import { FormItem } from "@/types/form";
import { useRef } from "react";

type ComponentProps = {
  question: FormItem;
};

const Currency: React.FC<ComponentProps> & { Settings?: React.FC } = ({
  question,
}) => {
  const currencyRef = useRef();
  //
  return (
    <div
      ref={currencyRef}
      id="current"
      className="flex  items-center  border border-input pl-3 rounded"
    >
      <span className="text-gray-500 text-xs">
        {question?.settings?.currency || "USD"}
      </span>
      <Input
        type="number"
        prefix="$"
        placeholder={question.placeholder || "Enter your text"}
        className="border-none focus-visible:border-none focus-visible:ring-0 shadow-none"
        onFocus={() => {
          currencyRef.current.classList.add("ring-1");
          currencyRef.current.classList.add("ring-ring");
        }}
        onBlur={() => {
          currencyRef.current.classList.remove("ring-1");
          currencyRef.current.classList.remove("ring-ring");
        }}
      />
    </div>
  );
};

const Settings: React.FC<{ question: FormItem }> = ({ question }) => {
  const updateQuestion = useFormStore((state) => state.updateQuestion);
  return (
    <>
      <div className="space-y-2 my-3">
        <Label>Currency</Label>
        <SelectField
          value={question?.settings?.currency || "USD"}
          onChange={(currency: string) => {
            updateQuestion(question.id, {
              settings: { ...question.settings, currency },
            });
          }}
          placeholder="Select Currency"
          options={currencies.map((currency) => ({
            label: currency.label,
            value: currency.code,
          }))}
        />
      </div>
    </>
  );
};

Currency.Settings = Settings;
Currency.displayName = "Currency";

export default Currency;
