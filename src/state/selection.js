import create from "zustand";

const useSelectionStore = create((set, get) => ({
  orgUnit: null,
  periodType: null,
  period: null,
  selectOrgUnit: (orgUnit) => set(() => ({ orgUnit })),
  selectPeriodType: (periodType) => set(() => ({ periodType })),
  selectPeriod: (period) => set(() => ({ period }))
}));

export default useSelectionStore;
