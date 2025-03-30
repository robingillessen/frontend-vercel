"use client";
import React from "react";
import { SidebarMenuItem } from "../ui/sidebar";
import { Badge } from "../ui/badge";
import { WerkinstructieSource } from "@/lib/types";
import { useSidebarStore } from "@/store/sidebar-store";
import { SourceBadgeText } from "../source-badge-text";
import { SourceType } from "@/lib/types";
import { ParagraphSource } from "../paragraph-sources";
export const Werkwijzes = ({
  werkinstructies,
}: {
  werkinstructies: WerkinstructieSource[];
}) => {
  const searchQuery = useSidebarStore((state) => state.searchQuery);
  const filter = useSidebarStore((state) => state.filter);

  const isFiltered = filter === SourceType.WERKINSTRUCTIE || filter === "all";

  const filteredWerkinstructies = werkinstructies.filter(
    (w) =>
      w.value.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.value.chunks.some((chunk) =>
        chunk.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <>
      {isFiltered &&
        filteredWerkinstructies.map((werkinstructie, index) => (
          <SidebarMenuItem
            key={`werkinstructie-${index}`}
            className="mb-2 border rounded-md p-2 overflow-hidden"
          >
            <div className="flex items-start gap-2 w-full">
              <ParagraphSource id={werkinstructie.id} />
              <SourceBadgeText sourceType={SourceType.LAW} />
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{`${werkinstructie.value.title}`}</div>
                <div className="text-sm text-muted-foreground line-clamp-2">
                  {werkinstructie.value.chunks.join(" ")}
                </div>
              </div>
              <span className="text-muted-foreground mr-2 shrink-0">
                {werkinstructies.length}
              </span>
            </div>
          </SidebarMenuItem>
        ))}
    </>
  );
};
