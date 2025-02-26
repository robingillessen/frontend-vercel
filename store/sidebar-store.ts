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

  // Typed sources
  legalData: LegalData | null;

  // Helper properties for quickly accessing specific source types
  lawArticles: LawArticle[];
  werkwijzes: Werkwijze[];
  taxonomyTerms: TaxonomyTerm[];
  selectielijstRows: SelectielijstRow[];
  lidoSubgraph: Subgraph | null;
  jasSubgraph: Subgraph | null;

  // Added isEmpty property
  isEmpty: boolean;

  // UI actions
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;

  // Data actions
  setLegalData: (data: LegalData) => void;
  clearLegalData: () => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isOpen: false,

  // Initialize typed sources
  legalData: null,
  lawArticles: [],
  werkwijzes: [],
  taxonomyTerms: [],
  selectielijstRows: [],
  lidoSubgraph: null,
  jasSubgraph: null,
  isEmpty: true, // Initialize as true since all arrays are empty

  // UI actions
  openSidebar: () => set({ isOpen: true }),
  closeSidebar: () => set({ isOpen: false }),
  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),

  // Data actions
  setLegalData: (data: LegalData) => {
    const lawArticles = data.law_articles || [];
    const werkwijzes = data.werkwijzes || [];
    const taxonomyTerms = data.taxonomy_terms || [];
    const selectielijstRows = data.selectielijst_rows || [];

    const isEmpty =
      lawArticles.length === 0 &&
      werkwijzes.length === 0 &&
      taxonomyTerms.length === 0 &&
      selectielijstRows.length === 0;

    set({
      legalData: data,
      lawArticles,
      werkwijzes,
      taxonomyTerms,
      selectielijstRows,
      lidoSubgraph: data.lido_subgraph || null,
      jasSubgraph: data.jas_subgraph || null,
      isEmpty,
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
    }),
}));
