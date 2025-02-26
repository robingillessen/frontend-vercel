import { create } from "zustand";
import {
  LegalData,
  LawArticle,
  Werkwijze,
  TaxonomyTerm,
  SelectielijstRow,
  Subgraph,
} from "@/lib/types";

interface SidebarState {
  isOpen: boolean;
  legalData: LegalData | null;
  // create a filter property for the source. type is one of keys of the legalData object
  filter: keyof LegalData | "all";
  searchQuery: string;

  // Helper properties for quickly accessing specific source types
  lawArticles: LawArticle[];
  werkwijzes: Werkwijze[];
  taxonomyTerms: TaxonomyTerm[];
  selectielijstRows: SelectielijstRow[];
  lidoSubgraph: Subgraph | null;
  jasSubgraph: Subgraph | null;

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
  setFilter: (filter: keyof LegalData | "all") => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isOpen: false,
  filter: "all",
  searchQuery: "",
  // Initialize typed sources
  legalData: null,
  lawArticles: [],
  werkwijzes: [],
  taxonomyTerms: [],
  selectielijstRows: [],
  lidoSubgraph: null,
  jasSubgraph: null,
  isEmpty: true,
  totalItems: 0,

  // UI actions
  setFilter: (filter: keyof LegalData | "all") => set({ filter }),
  setSearchQuery: (query: string) => set({ searchQuery: query }),
  openSidebar: () => set({ isOpen: true }),
  closeSidebar: () => set({ isOpen: false }),
  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),

  // Data actions
  setLegalData: (data: LegalData) => {
    const lawArticles = data.law_articles || [];
    const werkwijzes = data.werkwijzes || [];
    const taxonomyTerms = data.taxonomy_terms || [];
    const selectielijstRows = data.selectielijst_rows || [];

    const totalItems =
      lawArticles.length +
      werkwijzes.length +
      taxonomyTerms.length +
      selectielijstRows.length;

    const isEmpty = totalItems === 0;

    set({
      legalData: data,
      lawArticles,
      werkwijzes,
      taxonomyTerms,
      selectielijstRows,
      lidoSubgraph: data.lido_subgraph || null,
      jasSubgraph: data.jas_subgraph || null,
      isEmpty,
      totalItems,
      isOpen: true, // Auto-open sidebar when data is loaded
    });
  },

  clearLegalData: () =>
    set({
      legalData: null,
      lawArticles: [],
      werkwijzes: [],
      taxonomyTerms: [],
      selectielijstRows: [],
      lidoSubgraph: null,
      jasSubgraph: null,
      isEmpty: true, // Reset to true when clearing data
      totalItems: 0, // Reset total count to 0
    }),
}));
