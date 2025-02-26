import React from "react";
import { SidebarMenuItem } from "./ui/sidebar";
import { Badge } from "./ui/badge";
import { LawArticle } from "@/lib/types";
import { useSidebarStore } from "@/store/sidebar-store";
export const LawArticles = ({ lawArticles }: { lawArticles: LawArticle[] }) => {
  const { filter } = useSidebarStore();
  const isFiltered = filter === "law_articles" || filter === "all";
  return (
    <>
      {isFiltered &&
        lawArticles.map((article, index) => (
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
              <span className="text-muted-foreground mr-2 shrink-0">2</span>
            </div>
          </SidebarMenuItem>
        ))}
    </>
  );
};

export default LawArticles;
