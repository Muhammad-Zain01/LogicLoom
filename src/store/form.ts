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
  form: FormItem[];
  questionSelectedId: string | null;
  setForm: (items: FormItem[]) => void;
  addForm: (item: FormItem) => void;
  selectQuestion: (id: string) => void;
  unSelectedQuestion: () => void;
  removeFormQuestion: (id: string) => void;
};

export const useFormStore = create<FormStoreState>((set) => ({
  form: [] as FormItem[],
  questionSelectedId: null,
  setForm: (items: FormItem[]) => set({ form: items }),
  addForm: (item: FormItem) =>
    set((state) => ({ form: [...state.form, item] })),
  removeFormQuestion: (id: string) =>
    set((state) => ({
      form: state.form.filter((question) => question.id !== id),
    })),
  selectQuestion: (id: string) => set({ questionSelectedId: id }),
  unSelectedQuestion: () => set({ questionSelectedId: null }),
}));
