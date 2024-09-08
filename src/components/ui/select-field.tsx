import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

type SelectData = {
  label: string | number;
  value: string | number;
};
type SelectProps = {
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
  options?: SelectData[];
};

const SelectField: React.FC<SelectProps> = ({
  placeholder,
  value,
  onChange,
  options,
}) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {/* @ts-ignore */}
          {options.map((item: SelectData, idx: number) => {
            return (
              // @ts-ignore
              <SelectItem key={idx} value={item.value}>
                {item.label}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectField;
