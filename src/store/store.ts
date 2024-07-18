import { devtools } from "zustand/middleware";
import { StateCreator, create } from "zustand";

interface StoreState {
  search: string;
  selectedTypes: string[];

  setSearch: (search: string) => void;
  setSelectedTypes: (updater: (types: string[]) => string[] | string[]) => void;
}

const storeApi: StateCreator<StoreState> = (set) => ({
  search: "",
  selectedTypes: [],

  setSearch: (value: string) => set({ search: value }),
  setSelectedTypes: (value) =>
    set((state) => ({
      selectedTypes: typeof value === "function" ? value(state.selectedTypes) : value,
    })),
});

export const useStoreApi = create<StoreState>()(devtools(storeApi));
