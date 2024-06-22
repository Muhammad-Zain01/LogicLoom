import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ComponentProps = {
  value: string;
  onChange: (color: string) => void;
};
const ColorSelector: React.FC<ComponentProps> = ({ value, onChange }) => {
  return (
    <div className="flex flex-col space-y-2 my-3">
      <Label htmlFor="color-selector">Color</Label>
      <Input
        id="color-selector"
        type="color"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
    </div>
  );
};

export default ColorSelector;
