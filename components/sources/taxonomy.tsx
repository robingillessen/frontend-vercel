import React from "react";
import { Badge } from "../ui/badge";
import { SidebarMenuItem } from "../ui/sidebar";
import { Source, SourceType, TaxonomySource } from "@/lib/types";
import { useSidebarStore } from "@/store/sidebar-store";
import { SourceBadgeText } from "../source-badge-text";

export const Taxonomy = ({
  taxonomyTerms,
}: {
  taxonomyTerms: TaxonomySource[];
}) => {
  const { filter, searchQuery } = useSidebarStore();
  const isFiltered = filter === "taxonomy" || filter === "all";

  const filteredTaxonomyTerms = taxonomyTerms.filter((term) =>
    term.value.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {isFiltered &&
        filteredTaxonomyTerms.map((term, index) => (
          <SidebarMenuItem
            key={`term-${index}`}
            className="mb-2 border rounded-md p-2 overflow-hidden"
          >
            <div className="flex items-start gap-2 w-full">
              <SourceBadgeText sourceType={SourceType.TAXONOMY} />
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{term.value.label}</div>
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
          </SidebarMenuItem>
        ))}
    </>
  );
};
