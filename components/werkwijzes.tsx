import React from "react";
import { SidebarMenuItem } from "./ui/sidebar";
import { Badge } from "./ui/badge";
import { Werkwijze } from "@/lib/types";

export const Werkwijzes = ({ werkwijzes }: { werkwijzes: Werkwijze[] }) => {
  return (
    <>
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
              WERKWIJZES
            </Badge>
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">{`Wet open overheid Artikel ${werkwijze.werkwijze_title}`}</div>
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
