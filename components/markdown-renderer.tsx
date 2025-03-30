import React from "react";
import ReactMarkdown from "react-markdown";
import { TextParagraph } from "@/lib/types";
import { ParagraphSource } from "./paragraph-sources";
import { useSidebarStore } from "@/store/sidebar-store";
import { cn } from "@/lib/utils";

interface MarkdownRendererProps {
  content: TextParagraph[] | string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
}) => {
  const { hoveredSourceId, setHoveredSourceId } = useSidebarStore();

  const handleSourceClick = (sourceId: string) => {
    // TODO: Implementeer source opening logica
  };

  if (Array.isArray(content)) {
    return (
      <div className="markdown-content prose prose-neutral max-w-none">
        {content.map((item, index) => {
          const processedParagraph = item.paragraph.replace(
            /([\w-]+)<source_(\d+)>/g,
            (_, word, sourceId) => `[${word}](#source_${sourceId})`
          );

          return (
            <div key={index} className="mb-6">
              <ReactMarkdown
                components={{
                  a: ({ href, children }) => {
                    if (href?.startsWith("#source_")) {
                      const sourceId = href.replace("#", "");
                      const isHovered = hoveredSourceId === sourceId;
                      return (
                        <span
                          className={cn(
                            "cursor-pointer transition-all duration-200 px-1 rounded",
                            isHovered
                              ? "bg-white shadow-md"
                              : "bg-yellow-200/30 hover:bg-yellow-200/80"
                          )}
                          onClick={() => handleSourceClick(sourceId)}
                          onMouseEnter={() => setHoveredSourceId(sourceId)}
                          onMouseLeave={() => setHoveredSourceId(null)}
                        >
                          {children}
                        </span>
                      );
                    }
                    return <a href={href}>{children}</a>;
                  },
                }}
              >
                {processedParagraph}
              </ReactMarkdown>
              <div className="flex gap-2 mt-2">
                {Array.from(item.sources).map((sourceId) => (
                  <ParagraphSource key={sourceId} id={sourceId} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Handle string content (original behavior)
  const processedContent = content.replace(
    /([^<]+)<source_(\d+)>/g,
    (_, word, sourceId) => `[${word}](#source_${sourceId})`
  );

  return (
    <div className="markdown-content prose prose-neutral max-w-none">
      <ReactMarkdown
        components={{
          a: ({ href, children }) => {
            if (href?.startsWith("#source_")) {
              const sourceId = href.replace("#", "");
              const isHovered = hoveredSourceId === sourceId;
              return (
                <span
                  className={cn(
                    "cursor-pointer transition-all duration-200 px-1 rounded",
                    isHovered
                      ? "bg-white shadow-md"
                      : "bg-yellow-200/30 hover:bg-yellow-200/80"
                  )}
                  onClick={() => handleSourceClick(sourceId)}
                  onMouseEnter={() => setHoveredSourceId(sourceId)}
                  onMouseLeave={() => setHoveredSourceId(null)}
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
