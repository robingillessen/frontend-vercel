import React from "react";
import { SidebarMenuItem } from "../ui/sidebar";
import { SourceType, TaxonomySource } from "@/lib/types";
import { useSidebarStore } from "@/store/sidebar-store";
import { SourceBadgeText } from "../source-badge-text";
import { ParagraphSource } from "../paragraph-sources";
import { cn } from "@/lib/utils";

export const Taxonomy = ({
  taxonomyTerms,
}: {
  taxonomyTerms: TaxonomySource[];
}) => {
  const { filter, searchQuery, hoveredSourceId, setHoveredSourceId } =
    useSidebarStore();
  const isFiltered = filter === SourceType.TAXONOMY || filter === "all";

  const filteredTaxonomyTerms = taxonomyTerms.filter((term) =>
    term.value.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {isFiltered &&
        filteredTaxonomyTerms.map((term, index) => {
          const isHovered = hoveredSourceId === term.value.context[0].id;
          return (
            <SidebarMenuItem
              key={`term-${index}`}
              className={cn(
                "mb-2 border rounded-md p-2 overflow-hidden transition-all duration-200",
                isHovered && "bg-white shadow-md"
              )}
              onMouseEnter={() =>
                term.value.context[0].id &&
                setHoveredSourceId(term.value.context[0].id)
              }
              onMouseLeave={() => setHoveredSourceId(null)}
            >
              <div className="flex flex-col gap-2 w-full">
                <div className="flex items-start gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">
                      {term.value.label}
                    </div>
                    {term.value.context.map((ctx, ctxIndex) => (
                      <div
                        key={ctx.id || ctxIndex}
                        className="text-sm text-muted-foreground mt-1"
                      >
                        <div className="line-clamp-2">{ctx.definition}</div>
                        {ctx.wetcontext?.url && (
                          <a
                            href={ctx.wetcontext.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Wetgeving context
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ParagraphSource id={term.value.context[0].id} isNoHover />
                  <SourceBadgeText sourceType={SourceType.TAXONOMY} />
                </div>
              </div>
            </SidebarMenuItem>
          );
        })}
    </>
  );
};
