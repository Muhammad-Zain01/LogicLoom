// @ts-ignore
import { FormItem } from "@/store/form";
import { generateUUID } from "./utils";

export const DefaultFormField: FormItem = {
  id: "",
  type: "",
  label: "Untitled",
  placeholder: "",
  description: "",
  answer: null,
  is_required: true,
  is_readonly: false,
  is_form_item: true,
  is_widget: false,
  settings: {},
};

export const generateFormField = (data: any) => {
  return { ...DefaultFormField, ...data, id: generateUUID() };
};
