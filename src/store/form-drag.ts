import { create } from "zustand";

type FormDraggingState = {
  over: any;
  active: any;
  setOver: (id: any) => void;
  setActive: (id: any) => void;
};

export const useFormDraggingStore = create<FormDraggingState>((set) => ({
  over: {},
  active: {},
  setOver: (data: any) => set({ over: data }),
  setActive: (data: any) => set({ over: data }),
}));
