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
  const { filter, searchQuery, hoveredSourceId, setHoveredSourceId } =
    useSidebarStore();
  const isFiltered = filter === SourceType.SELECTIELIJST || filter === "all";

  const filteredSelectielijstRows = selectielijstRows.filter((row) =>
    row.value?.title?.toLowerCase().includes(searchQuery.toLowerCase())
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
                "mb-2 border rounded-md p-2 overflow-hidden transition-all duration-200",
                isHovered && "bg-white shadow-md"
              )}
              onMouseEnter={() => item.id && setHoveredSourceId(item.id)}
              onMouseLeave={() => setHoveredSourceId(null)}
            >
              <div className="flex flex-col gap-2 w-full">
                <div className="flex items-start gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">
                      {item.value.title}
                    </div>
                    {item.value.document && (
                      <div className="text-sm text-muted-foreground line-clamp-2">
                        {item.value.document}
                      </div>
                    )}
                  </div>
                  {item.value.url && (
                    <a
                      href={item.value.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground mr-2 shrink-0"
                    >
                      Link
                    </a>
                  )}
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
