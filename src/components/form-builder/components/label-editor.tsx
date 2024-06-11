import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ComponentProps = {
  value: string;
  onChange: (value: string) => void;
};
const LabelEditor: React.FC<ComponentProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <Label className="">Label</Label>
      <Input
        placeholder="Enter Label..."
        value={value}
        onChange={(e) => {
          onChange(e.currentTarget.value);
        }}
      />
    </div>
  );
};
export default LabelEditor;
