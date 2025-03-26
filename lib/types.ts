export interface Message {
  role: "user" | "assistant";
  content: TextParagraph[] | string;
}

export enum SourceType {
  LAW = "law",
  CASE_LAW = "case_law",
  TAXONOMY = "taxonomy",
  WERKINSTRUCTIE = "werkinstructie",
  SELECTIELIJST = "selectielijst",
}

interface BaseSource {
  id?: string;
  type: SourceType;
  isSource: boolean;
}

interface ISelectielijst {
  document?: string;
  title: string;
  url: string;
  isSource: boolean;
}

interface IWerkinstructie {
  title: string;
  url: string;
  isSource: boolean;
  chunks: string[];
}

interface ILaw {
  document?: string;
  title: string;
  law: string;
  url?: string;
  isSource: boolean;
  lido?: {};
}

interface ICaseLaw {
  document?: string;
  title: string;
  url: string;
  isSource: boolean;
}

interface ITaxonomy {
  label: string;
  context: Array<{
    id: string;
    isSource: boolean;
    source: string;
    definition: string;
    naderToegelicht: string[];
    wetcontext: {
      url: string;
    };
  }>;
}

// Specifieke source types
export interface LawSource extends BaseSource {
  type: SourceType.LAW;
  value: ILaw;
}

export interface WerkinstructieSource extends BaseSource {
  type: SourceType.WERKINSTRUCTIE;
  value: IWerkinstructie;
}

export interface CaseLawSource extends BaseSource {
  type: SourceType.CASE_LAW;
  value: ICaseLaw;
}

export interface TaxonomySource extends BaseSource {
  type: SourceType.TAXONOMY;
  value: ITaxonomy;
}

export interface SelectielijstSource extends BaseSource {
  type: SourceType.SELECTIELIJST;
  value: ISelectielijst;
}

// Union type voor alle sources (use type instead of interface)
export type Source =
  | LawSource
  | CaseLawSource
  | TaxonomySource
  | SelectielijstSource;

// Text paragraph interface
export interface TextParagraph {
  paragraph: string;
  sources: string[];
}

// Answer interface
export interface Answer {
  text: TextParagraph[];
  sources: Source[];
}

// Root data interface
export interface LegalData {
  answer: Answer;
  sources: Source[];
}

// Filter type
export type TFilter = SourceType | "answer" | "all";
