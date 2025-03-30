import { create } from "zustand";
import {
  LegalData,
  LawSource,
  CaseLawSource,
  TaxonomySource,
  SelectielijstSource,
  SourceType,
  WerkinstructieSource,
} from "@/lib/types";

interface SidebarState {
  isOpen: boolean;
  legalData: LegalData | null;
  filter: SourceType | "all";
  searchQuery: string;

  // Helper properties for quickly accessing specific source types
  lawArticles: LawSource[];
  caseLawSources: CaseLawSource[];
  taxonomySources: TaxonomySource[];
  selectielijstSources: SelectielijstSource[];
  werkinstructieSources: WerkinstructieSource[];

  // Added isEmpty property
  isEmpty: boolean;
  // Total number of items across all sources
  totalItems: number;

  // UI actions
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
  setSearchQuery: (query: string) => void;
  // Data actions
  setLegalData: (data: LegalData) => void;
  clearLegalData: () => void;
  setFilter: (filter: SourceType | "all") => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isOpen: false,
  filter: "all",
  searchQuery: "",
  // Initialize typed sources
  legalData: null,
  lawArticles: [],
  caseLawSources: [],
  taxonomySources: [],
  selectielijstSources: [],
  werkinstructieSources: [],
  isEmpty: true,
  totalItems: 0,

  // UI actions
  setFilter: (filter: SourceType | "all") => set({ filter }),
  setSearchQuery: (query: string) => set({ searchQuery: query }),
  openSidebar: () => set({ isOpen: true }),
  closeSidebar: () => set({ isOpen: false }),
  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),

  // Data actions
  setLegalData: (data: LegalData) => {
    const sources = data?.answer.sources || [];

    const lawArticles = sources.filter(
      (source): source is LawSource => source.type === SourceType.LAW
    );

    const caseLawSources = sources.filter((source): source is CaseLawSource => {
      if (source.type !== SourceType.CASE_LAW) return false;
      // Filter alleen de bronnen met isSource: true
      return source.value.isSource;
    });

    const taxonomySources = sources.filter(
      (source): source is TaxonomySource => {
        if (source.type !== SourceType.TAXONOMY) return false;
        // Filter alleen de context items met isSource: true
        source.value.context = source.value.context.filter(
          (context) => context.isSource
        );
        // Alleen bronnen behouden die nog context items over hebben
        return source.value.context.length > 0;
      }
    );

    const selectielijstSources = sources.filter(
      (source): source is SelectielijstSource =>
        source.type === SourceType.SELECTIELIJST
    );

    const werkinstructieSources = sources.filter(
      (source): source is WerkinstructieSource =>
        source.type === SourceType.WERKINSTRUCTIE
    );

    const totalItems = sources.length; // Direct gebruik maken van sources array lengte
    const isEmpty = totalItems === 0;

    set({
      legalData: data,
      lawArticles,
      caseLawSources,
      taxonomySources,
      selectielijstSources,
      werkinstructieSources,
      isEmpty,
      totalItems,
      isOpen: true,
    });
  },

  clearLegalData: () =>
    set({
      legalData: null,
      lawArticles: [],
      caseLawSources: [],
      taxonomySources: [],
      selectielijstSources: [],
      werkinstructieSources: [],
      isEmpty: true, // Reset to true when clearing data
      totalItems: 0, // Reset total count to 0
    }),
}));
