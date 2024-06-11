import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormStore } from "@/store/form";
import { FormItem } from "@/types/form";
import AlignmentSettings from "./alignment-settings";

type ComponentProps = {
  question: FormItem;
};

const SizeSettings: React.FC<ComponentProps> = ({ question }) => {
  const { updateQuestion } = useFormStore((state) => state);

  return (
    <div>
      <div className="mt-2 space-y-2 ">
        <Label>Size</Label>
        <Select
          onValueChange={(e) => {
            updateQuestion(question.id, {
              settings: { ...question.settings, size: e },
            });
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Size" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="small">Small</SelectItem>
              <SelectItem value="large">Large</SelectItem>
              <SelectItem value="extra_large">Extra Large</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <AlignmentSettings question={question} />
    </div>
  );
};

export default SizeSettings;
