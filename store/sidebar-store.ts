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

  // UI actions
  openSidebar: () => set({ isOpen: true }),
  closeSidebar: () => set({ isOpen: false }),
  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),

  // Data actions
  setLegalData: (data: LegalData) =>
    set({
      legalData: data,
      lawArticles: data.law_articles || [],
      werkwijzes: data.werkwijzes || [],
      taxonomyTerms: data.taxonomy_terms || [],
      selectielijstRows: data.selectielijst_rows || [],
      lidoSubgraph: data.lido_subgraph || null,
      jasSubgraph: data.jas_subgraph || null,
      isOpen: true, // Auto-open sidebar when data is loaded
    }),

  clearLegalData: () =>
    set({
      legalData: null,
      lawArticles: [],
      werkwijzes: [],
      taxonomyTerms: [],
      selectielijstRows: [],
      lidoSubgraph: null,
      jasSubgraph: null,
    }),
}));
