"use client";

import { useSidebarStore } from "@/store/sidebar-store";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Filter, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SidebarSourcesSkeleton } from "@/components/skeleton-loaders/sidebar-sources-skeleton";

export function SidebarContent() {
  const { lawArticles, werkwijzes, taxonomyTerms, selectielijstRows } =
    useSidebarStore();

  // Check if all data arrays are empty
  const isEmpty =
    lawArticles.length === 0 &&
    werkwijzes.length === 0 &&
    taxonomyTerms.length === 0 &&
    selectielijstRows.length === 0;

  return (
    <SidebarProvider>
      <SidebarGroup>
        <SidebarGroupLabel className="font-semibold text-lg mb-2">
          Geindexeerde bronnen
        </SidebarGroupLabel>

        <Button
          variant="outline"
          className="w-full mb-4 border-dashed py-6 flex items-center justify-center gap-2 text-muted-foreground"
        >
          <Filter className="size-4" />
          <span>Handmatig bronnen toevoegen</span>
          <Plus className="size-4" />
        </Button>

        <SidebarGroupContent>
          <SidebarMenu>
            {isEmpty ? (
              <SidebarSourcesSkeleton />
            ) : (
              <>
                {lawArticles.map((article, index) => (
                  <SidebarMenuItem
                    key={`law-${index}`}
                    className="mb-2 border rounded-md p-2 overflow-hidden"
                  >
                    <div className="flex items-start gap-2 w-full">
                      <Badge
                        variant="outline"
                        className="bg-green-100 text-green-800 rounded-md px-2 py-1 text-xs flex items-center shrink-0"
                      >
                        WET
                      </Badge>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{`Wet open overheid Artikel ${article.law_article}`}</div>
                        <div className="text-sm text-muted-foreground line-clamp-2">
                          {article.text_fragment}
                        </div>
                      </div>
                      <span className="text-muted-foreground mr-2 shrink-0">
                        2
                      </span>
                    </div>
                  </SidebarMenuItem>
                ))}

                {werkwijzes.map((werkwijze, index) => (
                  <SidebarMenuItem
                    key={`werkwijze-${index}`}
                    className="mb-2 border rounded-md p-2 overflow-hidden"
                  >
                    <div className="flex items-start gap-2 w-full">
                      <Badge
                        variant="outline"
                        className="bg-purple-100 text-purple-800 rounded-md px-2 py-1 text-xs flex items-center shrink-0"
                      >
                        WERKWIJZERS
                      </Badge>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{`Wet open overheid Artikel ${werkwijze.werkwijze_title}`}</div>
                        <div className="text-sm text-muted-foreground line-clamp-2">
                          {werkwijze.text_fragment}
                        </div>
                      </div>
                      <span className="text-muted-foreground mr-2 shrink-0">
                        2
                      </span>
                    </div>
                  </SidebarMenuItem>
                ))}

                {taxonomyTerms.map((term, index) => (
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
                      <span className="text-muted-foreground mr-2 shrink-0">
                        2
                      </span>
                    </div>
                  </SidebarMenuItem>
                ))}

                {selectielijstRows.map((row, index) => (
                  <SidebarMenuItem
                    key={`row-${index}`}
                    className="mb-2 border rounded-md p-2 overflow-hidden"
                  >
                    <div className="flex items-start gap-2 w-full">
                      <Badge
                        variant="outline"
                        className="bg-blue-100 text-blue-800 rounded-md px-2 py-1 text-xs flex items-center shrink-0"
                      >
                        JURISPRUDENTIE
                      </Badge>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{`${row.Proces} - ${row.Onderwerp}`}</div>
                        <div className="text-sm text-muted-foreground line-clamp-2">
                          {row.Omschrijving}
                        </div>
                      </div>
                      <span className="text-muted-foreground mr-2 shrink-0">
                        2
                      </span>
                    </div>
                  </SidebarMenuItem>
                ))}
              </>
            )}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarProvider>
  );
}
