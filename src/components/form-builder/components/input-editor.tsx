import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ComponentProps = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};
const InputEditor: React.FC<ComponentProps> = ({
  label,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className="space-y-2 my-3">
      <Label className="">{label}</Label>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange(e.currentTarget.value);
        }}
      />
    </div>
  );
};
export default InputEditor;
