import React from "react";
import ReactMarkdown from "react-markdown";
import { TextParagraph } from "@/lib/types";
import { ParagraphSources } from "./paragraph-sources";

interface MarkdownRendererProps {
  content: TextParagraph[] | string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
}) => {
  const handleSourceClick = (sourceId: string) => {
    console.log(`Opening source: ${sourceId}`);
    // TODO: Implementeer source opening logica
  };
  console.log(content);
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
                {processedParagraph}
              </ReactMarkdown>
              <div className="flex gap-2 mt-2">
                {Array.from(item.sources).map((sourceId) => (
                  <ParagraphSources key={sourceId} id={sourceId} />
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

  console.log("Processed content:", processedContent);

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
