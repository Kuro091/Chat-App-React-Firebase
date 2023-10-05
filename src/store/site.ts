import { create } from 'zustand';

interface SiteStoreState {
  headerSize: number;
  setHeaderSize: (size: number) => void;
}

export const useSiteStore = create<SiteStoreState>()((set) => ({
  headerSize: 0,
  setHeaderSize: (size: number) => set(() => ({ headerSize: size })),
}));
