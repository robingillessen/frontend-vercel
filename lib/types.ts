export interface Message {
  role: "user" | "assistant";
  content: string;
}

// Source interface
export interface Source {
  id: string;
  type: string;
  value: {
    isSource?: boolean;
    document?: string;
    title?: string;
    law?: string;
    url?: string;
    lido?: Record<string, unknown>;
    name?: string;
    rows?: any[];
    // For taxonomy type
    label?: string;
    context?: Array<{
      id: string;
      isSource: boolean;
      source: string;
      definition: string;
      naderToegelicht: string[];
      wetcontext: {
        url: string;
      };
    }>;
  };
}

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
}

export type TFilter = keyof LegalData | "all";
