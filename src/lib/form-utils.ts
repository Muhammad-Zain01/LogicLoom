import { FormItem } from "@/store/form";

export const DefaultFormField: FormItem = {
  id: "",
  type: "",
  label: "Untitled",
  placeholder: "",
  description: "",
  is_required: true,
  is_readonly: false,
  settings: {},
};

const generateFormField = (data: any) => {
  return { ...DefaultFormField };
};
