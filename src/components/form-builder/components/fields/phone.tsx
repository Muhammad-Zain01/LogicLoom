"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormStore } from "@/store/form";
import { FormItem } from "@/types/form";

type ComponentProps = {
  question: FormItem;
};

const Phone: React.FC<ComponentProps> & { Settings?: React.FC } = ({
  question,
}) => {
  return (
    <Input
      type="number"
      placeholder={question.placeholder || "Enter your phone number"}
    />
  );
};

const Settings: React.FC<{ question: FormItem }> = ({ question }) => {
  const updateQuestion = useFormStore((state) => state.updateQuestion);

  return (
    <>
      <div className="space-y-2 my-3">
        <Label>Mapping</Label>
        <Input
          value={question?.settings?.mapping || "(###) ###-####"}
          onChange={(e) => {
            updateQuestion(question.id, {
              settings: { ...question.settings, mapping: e.target.value },
            });
            console.log();
          }}
        />
      </div>
    </>
  );
};

Phone.Settings = Settings;
Phone.displayName = "phone";

export default Phone;
