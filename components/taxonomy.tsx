import React from "react";
import { Badge } from "./ui/badge";
import { SidebarMenuItem } from "./ui/sidebar";
import { TaxonomyTerm } from "@/lib/types";
import { useSidebarStore } from "@/store/sidebar-store";
export const Taxonomy = ({
  taxonomyTerms,
}: {
  taxonomyTerms: TaxonomyTerm[];
}) => {
  const { filter } = useSidebarStore();
  const isFiltered = filter === "taxonomy_terms" || filter === "all";
  return (
    <>
      {isFiltered &&
        taxonomyTerms.map((term, index) => (
          <SidebarMenuItem
            key={`term-${index}`}
            className="mb-2 border rounded-md p-2 overflow-hidden"
          >
            <div className="flex items-start gap-2 w-full">
              <Badge
                variant="outline"
                className="bg-blue-100 text-blue-800 rounded-md px-2 py-1 text-xs flex items-center shrink-0"
              >
                TAXONOMIE
              </Badge>
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">
                  {term["beg-sbb:Label"]}
                </div>
              </div>
              <span className="text-muted-foreground mr-2 shrink-0">2</span>
            </div>
          </SidebarMenuItem>
        ))}
    </>
  );
};
