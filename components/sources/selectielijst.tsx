import React from "react";
import { TableHead, TableHeader } from "../ui/table";
import { TableCell, TableRow } from "../ui/table";
import { TableBody } from "../ui/table";
import { SidebarMenuItem } from "../ui/sidebar";
import { Table } from "../ui/table";
import { Badge } from "../ui/badge";
import { SelectielijstSource, SourceType } from "@/lib/types";
import { useSidebarStore } from "@/store/sidebar-store";
import { SourceBadgeText } from "../source-badge-text";

export const Selectielijst = ({
  selectielijstRows,
}: {
  selectielijstRows: SelectielijstSource[];
}) => {
  const { filter, searchQuery } = useSidebarStore();
  const isFiltered = filter === "selectielijst" || filter === "all";

  const filteredSelectielijstRows = selectielijstRows.filter((row) =>
    row.value?.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {isFiltered &&
        filteredSelectielijstRows.map((item, index) => (
          <SidebarMenuItem
            key={`selectielijst-${index}`}
            className="mb-2 border rounded-md p-2 overflow-hidden"
          >
            <div className="flex items-start gap-2 w-full">
              <SourceBadgeText sourceType={SourceType.SELECTIELIJST} />
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{item.value.title}</div>
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
          </SidebarMenuItem>
        ))}
    </>
  );
};
