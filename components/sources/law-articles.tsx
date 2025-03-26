import React from "react";
import { SidebarMenuItem } from "../ui/sidebar";
import { Badge } from "../ui/badge";
import { LawSource, SourceType } from "@/lib/types";
import { useSidebarStore } from "@/store/sidebar-store";
import { SourceBadgeText } from "../source-badge-text";
export const LawArticles = ({ lawArticles }: { lawArticles: LawSource[] }) => {
  const { filter, searchQuery } = useSidebarStore();
  const isFiltered = filter === "law" || filter === "all";
  const filteredLawArticles = lawArticles.filter(
    (article) =>
      article.value.law.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.value.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <>
      {isFiltered &&
        filteredLawArticles.map((article, index) => (
          <SidebarMenuItem
            key={`law-${index}`}
            className="mb-2 border rounded-md p-2 overflow-hidden"
          >
            <div className="flex items-start gap-2 w-full">
              <SourceBadgeText sourceType={SourceType.LAW} />
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{article.value.law}</div>
                <div className="text-sm text-muted-foreground line-clamp-2">
                  {article.value.title}
                </div>
              </div>
              {article.value.url && (
                <a
                  href={article.value.url}
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

export default LawArticles;
