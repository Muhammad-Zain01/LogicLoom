import { FormItem } from "@/store/form";
import { generateUUID } from "./utils";

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

export const generateFormField = (data: any) => {
  return { ...DefaultFormField, ...data, id: generateUUID() };
};