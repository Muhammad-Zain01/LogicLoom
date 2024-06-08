"use client";
import { Input } from "@/components/ui/input";

type ComponentProps = {
  placeholder?: string;
  field?: any;
};

const SingleLine: React.FC<ComponentProps> = ({ placeholder, field }) => {
  return (
    <Input
      type="text"
      placeholder={placeholder || "Enter your text"}
      {...field}
    />
  );
};

export default SingleLine;
