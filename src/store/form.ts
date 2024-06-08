import { create } from "zustand";

type FormStoreState = {
  form: any[];
  setForm: (items: any) => void;
};

const currentDefault = [
  {
    id: "1235kcja;dsf",
    type: "single-line",
    label: "First Name",
    reference: "first_name_123",
    placeholder: "Enter your first name",
    description: "Enter your first name",
    is_required: true,
    is_readonly: false,
    settings: {},
  },
  {
    id: "1235",
    type: "single-line",
    label: "Last Name",
    reference: "first_name_123",
    placeholder: "Enter your first name",
    description: "Enter your first name",
    is_required: true,
    is_readonly: false,
    settings: {},
  },
  {
    id: "1235kcja;dsf22",
    type: "button",
    label: "Submit",
    reference: "btn_123",
    placeholder: "",
    description: "",
    is_required: true,
    is_readonly: false,
  },
];

export const useFormStore = create<FormStoreState>((set) => ({
  form: currentDefault,
  setForm: (items: any) => set({ form: items }),
}));
