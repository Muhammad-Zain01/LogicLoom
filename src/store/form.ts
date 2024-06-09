import { create } from "zustand";

export type FieldType = string;

export type FormItem = {
  id: string;
  type: FieldType;
  label: string;
  placeholder: string;
  description: string;
  is_required: boolean;
  is_readonly: boolean;
  settings: any;
};

type FormStoreState = {
  form: any;
  setForm: (items: any) => void;
  addForm: (item: FormItem) => void;
};

type FormDraggingState = {
  overId: any;
  activeId: any;
  setOverId: (id: any) => void;
  setActiveId: (id: any) => void;
};

const currentDefault = [
  {
    id: "1235kcja;dsf",
    type: "single-line",
    label: "First Name",
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
    placeholder: "Enter your first name",
    description: "Enter your first name",
    is_required: true,
    is_readonly: false,
    settings: {},
  },
];

export const useFormStore = create<FormStoreState>((set) => ({
  form: currentDefault,
  setForm: (items: any) => set({ form: items }),
  addForm: (item: any) => set((state) => ({ form: [...state.form, item] })),
}));

export const useFormDraggingStore = create<FormDraggingState>((set) => ({
  overId: {},
  activeId: {},
  setOverId: (data: any) => set({ overId: data }),
  setActiveId: (data: any) => set({ activeId: data }),
}));
