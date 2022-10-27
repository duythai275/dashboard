import create from "zustand";

const useSelectionStore = create((set, get) => ({
  orgUnit: null,
  periodType: null,
  period: null,
  language: 0,
  selectOrgUnit: (orgUnit) => set(() => ({ orgUnit })),
  selectPeriodType: (periodType) => set(() => ({ periodType })),
  selectPeriod: (period) => set(() => ({ period })),
  selectLanguage: (language) => set(() => ({ language }))
}));

export default useSelectionStore;
