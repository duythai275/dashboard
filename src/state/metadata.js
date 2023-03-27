import { create } from "zustand";

const useMetadataStore = create((set, get) => ({
  setMetadata: (key, value) => set(() => ({ [key]: value }))
}));

export default useMetadataStore;
