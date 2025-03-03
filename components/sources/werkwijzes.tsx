"use client";
import React from "react";
import { SidebarMenuItem } from "../ui/sidebar";
import { Badge } from "../ui/badge";
import { Werkwijze } from "@/lib/types";
import { useSidebarStore } from "@/store/sidebar-store";

export const Werkwijzes = ({ werkwijzes }: { werkwijzes: Werkwijze[] }) => {
  const searchQuery = useSidebarStore((state) => state.searchQuery);
  const filter = useSidebarStore((state) => state.filter);

  const isFiltered = filter === "werkwijzes" || filter === "all";

  const filteredWerkwijzes = werkwijzes.filter(
    (w) =>
      w.werkwijze_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.text_fragment.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {isFiltered &&
        filteredWerkwijzes.map((werkwijze, index) => (
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
                <div className="font-medium truncate">{`${werkwijze.werkwijze_title}`}</div>
                <div className="text-sm text-muted-foreground line-clamp-2">
                  {werkwijze.text_fragment}
                </div>
              </div>
              <span className="text-muted-foreground mr-2 shrink-0">
                {werkwijzes.length}
              </span>
            </div>
          </SidebarMenuItem>
        ))}
    </>
  );
};
