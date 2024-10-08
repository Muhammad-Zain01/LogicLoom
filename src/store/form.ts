import { FormItem } from "@/types/form";
import { create } from "zustand";

type FormStoreState = {
  form: FormItem[];
  questionSelectedId: string | null;
  editable: boolean;
  setForm: (items: FormItem[]) => void;
  addForm: (item: FormItem) => void;
  selectQuestion: (id: string) => void;
  unSelectedQuestion: () => void;
  removeFormQuestion: (id: string) => void;
  setEditable: (value: boolean) => void;
  updateQuestion: (id: string, value: any) => void;
};

export const useFormStore = create<FormStoreState>((set) => ({
  form: [] as FormItem[],
  questionSelectedId: null,
  editable: true,
  setForm: (items: FormItem[]) => set({ form: items }),
  setEditable: (value: boolean) => set({ editable: value }),
  addForm: (item: FormItem) =>
    set((state) => ({ form: [...state.form, item] })),
  updateQuestion: (id: string, value: FormItem) =>
    set((state) => {
      return {
        form: state.form.map((question) => {
          if (question.id === id) {
            return { ...question, ...value };
          }
          return question;
        }),
      };
    }),
  removeFormQuestion: (id: string) =>
    set((state) => ({
      form: state.form.filter((question) => question.id !== id),
    })),
  selectQuestion: (id: string) => set({ questionSelectedId: id }),
  unSelectedQuestion: () => set({ questionSelectedId: null }),
}));
