import React from "react";
import { SidebarMenuItem } from "../ui/sidebar";
import { SelectielijstSource, SourceType } from "@/lib/types";
import { useSidebarStore } from "@/store/sidebar-store";
import { SourceBadgeText } from "../source-badge-text";
import { ParagraphSource } from "../paragraph-sources";
import { cn } from "@/lib/utils";

export const Selectielijst = ({
  selectielijstRows,
}: {
  selectielijstRows: SelectielijstSource[];
}) => {
  const {
    filter,
    searchQuery,
    hoveredSourceId,
    setHoveredSourceId,
    selectSource,
  } = useSidebarStore();
  const isFiltered = filter === SourceType.SELECTIELIJST || filter === "all";

  const filteredSelectielijstRows = selectielijstRows.filter(
    (row) =>
      row.value?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.value?.rows?.some((row) =>
        row.omschrijving.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      row.value?.rows?.some((row) =>
        row.voorbeeldstukken.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <>
      {isFiltered &&
        filteredSelectielijstRows.map((item, index) => {
          const isHovered = hoveredSourceId === item.id;
          return (
            <SidebarMenuItem
              key={`selectielijst-${index}`}
              className={cn(
                "mb-2 border rounded-md p-2 overflow-hidden transition-all duration-200 cursor-pointer",
                isHovered && "bg-white shadow-md"
              )}
              onMouseEnter={() => item.id && setHoveredSourceId(item.id)}
              onMouseLeave={() => setHoveredSourceId(null)}
              onClick={() => selectSource(item)}
            >
              <div className="flex flex-col gap-2 w-full">
                <div className="flex items-start gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">
                      {item.value.name.charAt(0).toUpperCase() +
                        item.value.name.slice(1)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ParagraphSource id={item.id} isNoHover />
                  <SourceBadgeText sourceType={SourceType.SELECTIELIJST} />
                </div>
              </div>
            </SidebarMenuItem>
          );
        })}
    </>
  );
};
