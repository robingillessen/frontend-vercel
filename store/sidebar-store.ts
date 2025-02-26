import { create } from 'zustand';

interface SidebarState {
  isOpen: boolean;
  sources: any[]; // You can replace 'any' with a proper type for your sources
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
  setSources: (sources: any[]) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isOpen: false,
  sources: [],
  openSidebar: () => set({ isOpen: true }),
  closeSidebar: () => set({ isOpen: false }),
  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
  setSources: (sources) => set({ sources }),
}));
