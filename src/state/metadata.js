import create from "zustand";

const useMetadataStore = create((set, get) => ({
  me: null,
  orgUnits: null,
  setMetadata: (key, value) => set(() => ({ [key]: value }))
}));

export default useMetadataStore;
