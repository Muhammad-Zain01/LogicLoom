import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

type ComponentProps = {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
};

const Toggle: React.FC<ComponentProps> = ({ label, value, onChange }) => {
  return (
    <div className="space-y-3 flex flex-col my-4">
      <Label className="">{label}</Label>
      <Switch checked={value} onCheckedChange={onChange} id="airplane-mode" />
    </div>
  );
};
export default Toggle;
