import { create } from "zustand";

type FormItem = any;

type FormStoreState = {
  form: FormItem[];
  setForm: (items: FormItem) => void;
  addForm: (item: FormItem) => void;
};

type FormDraggingState = {
  overId: any;
  activeId: any;
  draggingItem: any;
  setOverId: (id: any) => void;
  setActiveId: (id: any) => void;
  setDraggingItem: (id: any) => void;
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
  // {
  //   id: "1235kcja;dsf22",
  //   type: "button",
  //   label: "Submit",
  //   reference: "btn_123",
  //   placeholder: "",
  //   description: "",
  //   is_required: true,
  //   is_readonly: false,
  // },
];

export const useFormStore = create<FormStoreState>((set) => ({
  form: currentDefault,
  setForm: (items: any) => set({ form: items }),
  addForm: (item: any) => set((state) => ({ form: [...state.form, item] })),
}));

export const useFormDraggingStore = create<FormDraggingState>((set) => ({
  overId: {},
  activeId: {},
  draggingItem: {},
  setOverId: (data: any) => set({ overId: data }),
  setActiveId: (data: any) => set({ activeId: data }),
  setDraggingItem: (data: any) => set({ draggingItem: data }),
}));
