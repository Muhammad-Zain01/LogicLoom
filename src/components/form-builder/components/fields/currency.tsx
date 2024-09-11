"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SelectField from "@/components/ui/select-field";
import currencies from "@/constants/currencies";
import { useFormStore } from "@/store/form";
import { FormItem } from "@/types/form";
import { useRef, useEffect } from "react";

type ComponentProps = {
  question: FormItem;
  onChange: (value: string) => void;
};

const Currency: React.FC<ComponentProps> & { Settings?: React.FC<{ question: FormItem }> } = ({
  question,
  onChange,
}) => {
  const currencyRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={currencyRef}
      className="flex items-center border border-input pl-3 rounded"
    >
      <span className="text-gray-500 text-xs">
        {question?.settings?.currency || "USD"}
      </span>
      <Input
        type="number"
        value={question.answer || ""}
        placeholder={question.placeholder || "Enter amount"}
        className="border-none focus-visible:border-none focus-visible:ring-0 shadow-none"
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => {
          currencyRef.current?.classList.add("ring-1", "ring-ring");
        }}
        onBlur={() => {
          currencyRef.current?.classList.remove("ring-1", "ring-ring");
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
