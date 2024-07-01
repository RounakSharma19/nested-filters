import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TFilterCategory, TFilterOption } from "../interfaces";

export interface FiltersState {
  filters: Array<TFilterCategory>;
  selectedFilters: { [key: string]: Array<TFilterOption> };
  isDropdownOpen: boolean;
  currentCategory: TFilterCategory | null;
  filterPillActive: boolean;
  filtersApplied: boolean;
}

const initialState: FiltersState = {
  filters: [],
  selectedFilters: {},
  isDropdownOpen: false,
  currentCategory: null,
  filterPillActive: false,
  filtersApplied: false,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<Array<TFilterCategory>>) {
      state.filters = action.payload;
    },
    setSelectedFilters(
      state,
      action: PayloadAction<{ [key: string]: Array<TFilterOption> }>
    ) {
      state.selectedFilters = action.payload;
    },
    addSelectedFilter(
      state,
      action: PayloadAction<{ category: string; option: TFilterOption }>
    ) {
      const { category, option } = action.payload;
      if (!state.selectedFilters[category]) {
        state.selectedFilters[category] = [];
      }
      state.selectedFilters[category].push(option);
    },
    removeSelectedFilter(
      state,
      action: PayloadAction<{ category: string; optionId: number }>
    ) {
      const { category, optionId } = action.payload;
      if (state.selectedFilters[category]) {
        state.selectedFilters[category] = state.selectedFilters[
          category
        ].filter((o) => o.id !== optionId);
        if (state.selectedFilters[category].length === 0) {
          delete state.selectedFilters[category];
        }
      }
    },
    clearSelectedFilters(state) {
      state.selectedFilters = {};
    },
    applySelectedFilters(state) {
      state.filtersApplied = true;
    },
    setIsDropdownOpen(state, action: PayloadAction<boolean>) {
      state.isDropdownOpen = action.payload;
    },
    setCurrentCategory(state, action: PayloadAction<TFilterCategory | null>) {
      state.currentCategory = action.payload;
    },
    setFilterPillActive(state, action: PayloadAction<boolean>) {
      state.filterPillActive = action.payload;
    },
  },
});

export const {
  setFilters,
  setSelectedFilters,
  addSelectedFilter,
  removeSelectedFilter,
  clearSelectedFilters,
  applySelectedFilters,
  setIsDropdownOpen,
  setCurrentCategory,
  setFilterPillActive,
} = filtersSlice.actions;

export default filtersSlice.reducer;
