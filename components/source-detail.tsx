"use client";

import React from "react";
import { Source, SourceType } from "@/lib/types";
import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { SourceBadgeText } from "./source-badge-text";
import { cn, getTailwindClasses } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { MarkdownRenderer } from "./markdown-renderer";

interface SourceDetailProps {
  source: Source;
  onBack: () => void;
}

export const SourceDetail = ({ source, onBack }: SourceDetailProps) => {
  const renderSourceContent = () => {
    switch (source.type) {
      case SourceType.LAW:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">{source.value.law}</h2>
            <p className="text-muted-foreground">{source.value.title}</p>
            {source.value.document && (
              <div className="">
                <MarkdownRenderer content={source.value.document} />
              </div>
            )}
            {source.value.url && (
              <a
                href={source.value.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Bekijk op overheid.nl
              </a>
            )}
          </div>
        );

      case SourceType.CASE_LAW:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">{source.value.title}</h2>
            {source.value.document && (
              <div className="prose prose-neutral max-w-none">
                {source.value.document}
              </div>
            )}
            {source.value.url && (
              <a
                href={source.value.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Bekijk op rechtspraak.nl
              </a>
            )}
          </div>
        );

      case SourceType.TAXONOMY:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">{source.value.label}</h2>
            {source.value.context.map((ctx, index) => (
              <div key={ctx.id || index} className="space-y-2">
                <p className="text-muted-foreground">{ctx.definition}</p>
                {ctx.naderToegelicht.length > 0 && (
                  <div>
                    <h3 className="font-medium mb-2">Nader toegelicht:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {ctx.naderToegelicht.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {ctx.wetcontext?.url && (
                  <a
                    href={ctx.wetcontext.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline block mt-2"
                  >
                    Bekijk wettelijke context
                  </a>
                )}
              </div>
            ))}
          </div>
        );

      case SourceType.SELECTIELIJST:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">{source.value.name}</h2>
            <div className="space-y-6">
              {source.value.rows.map((row, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium">Functie</p>
                      <p className="text-muted-foreground">{row.functie}</p>
                    </div>
                    <div>
                      <p className="font-medium">Categorie</p>
                      <p className="text-muted-foreground">{row.categorie}</p>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">Onderwerp</p>
                    <p className="text-muted-foreground">{row.onderwerp}</p>
                  </div>
                  <div>
                    <p className="font-medium">Omschrijving</p>
                    <p className="text-muted-foreground">{row.omschrijving}</p>
                  </div>
                  <div>
                    <p className="font-medium">Waardering</p>
                    <p className="text-muted-foreground">{row.waardering}</p>
                  </div>
                  <div>
                    <p className="font-medium">Voorbeeldstukken</p>
                    <p className="text-muted-foreground">
                      {row.voorbeeldstukken}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col pl-8 relative source-detail-container">
      <div
        className={cn(
          "absolute w-1  left-5 top-24 h-full",
          getTailwindClasses(source.type)
        )}
      ></div>
      <div className="flex items-center gap-2 pt-4 border-b">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="shrink-0"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <SourceBadgeText sourceType={source.type} />
      </div>
      <div className="flex-1 overflow-auto px-4 pt-6 ">
        {renderSourceContent()}
      </div>
    </div>
  );
};
