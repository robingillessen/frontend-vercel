import React from "react";
import ReactMarkdown from "react-markdown";
import { useSidebarStore } from "@/store/sidebar-store";

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
}) => {
  // Vervang <source_X> tags met klikbare spans
  const processedContent = content.replace(
    /([\w-]+)<source_(\d+)>/g,
    (_, word, sourceId) => `[${word}](#source_${sourceId})`
  );

  const handleSourceClick = (sourceId: string) => {
    // Hier kun je de logica toevoegen om de juiste source te tonen
    console.log(`Opening source: ${sourceId}`);
    // TODO: Implementeer source opening logica
  };

  return (
    <div className="markdown-content prose prose-neutral max-w-none">
      <ReactMarkdown
        components={{
          a: ({ href, children }) => {
            if (href?.startsWith("#source_")) {
              const sourceId = href.replace("#", "");
              return (
                <span
                  className="cursor-pointer bg-yellow-200/30 hover:bg-yellow-200/80 transition-colors duration-200 px-1 rounded"
                  onClick={() => handleSourceClick(sourceId)}
                >
                  {children}
                </span>
              );
            }
            return <a href={href}>{children}</a>;
          },
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
};
