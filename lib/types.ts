export interface Message {
  role: "user" | "assistant";
  content: string;
}

// Law article interface
export interface LawArticle {
  law_title: string;
  law_article: string;
  url: string;
  text_fragment: string;
  date: string;
  URI: string;
}

// Werkwijze interface
export interface Werkwijze {
  werkwijze_title: string;
  url: string;
  text_fragment: string;
  date: string;
  URI: string;
}

// Taxonomy context interface
export interface TaxonomyContext {
  "beg-sbb:Definition": string;
  "beg-sbb:Source": string;
  "wir:naderToegelicht": string[];
}

// Taxonomy term interface
export interface TaxonomyTerm {
  "beg-sbb:Label": string;
  "wir:context": TaxonomyContext[];
}

// Selectielijst row interface
export interface SelectielijstRow {
  Proces: string;
  Onderwerp: string;
  Omschrijving: string;
  Bewaartermijn: string;
  Voorbeeldstukken: string;
}

// Graph node interface
export interface GraphNode {
  id: string;
  label: string;
}

// Graph link interface
export interface GraphLink {
  source: string;
  target: string;
  label: string;
}

// Subgraph interface
export interface Subgraph {
  nodes: GraphNode[];
  links: GraphLink[];
}

// Root data interface
export interface LegalData {
  answer: string;
  law_articles: LawArticle[];
  werkwijzes: Werkwijze[];
  taxonomy_terms: TaxonomyTerm[];
  selectielijst_rows: SelectielijstRow[];
  lido_subgraph: Subgraph;
  jas_subgraph: Subgraph;
}

export type TFilter = keyof LegalData | "all";
