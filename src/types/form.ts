export type FieldType = string;

export type FormSettings = any;

export type HeadingSize = "small" | "medium" | "large";

export type FormItem = {
  id: string;
  type: FieldType;
  label: string;
  placeholder: string;
  description: string;
  answer: string;
  is_required: boolean;
  is_readonly: boolean;
  is_form_item: boolean;
  is_widget: boolean;
  settings: FormSettings;
};
