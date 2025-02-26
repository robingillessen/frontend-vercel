"use client";

import { useSidebarStore } from "@/store/sidebar-store";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowDownUp, Filter, Search, SortAsc } from "lucide-react"; // Make sure you have lucide-react installed
import { SidebarContent } from "./sidebar-content";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TFilter } from "@/lib/types";

export function SourcesSidebar() {
  const {
    isOpen,
    closeSidebar,
    taxonomyTerms,
    lawArticles,
    werkwijzes,
    selectielijstRows,
    totalItems,
    filter,
    setFilter,
  } = useSidebarStore();

  // Example filter categories - replace with your actual data
  const filters = [
    { id: "all", name: "Alles", count: totalItems },
    { id: "law_articles", name: "Wetten", count: lawArticles.length },
    { id: "werkwijzes", name: "Werkwijzes", count: werkwijzes.length },
    { id: "taxonomy_terms", name: "Taxonomie", count: taxonomyTerms.length },
    {
      id: "selectielijst_rows",
      name: "Selectielijst",
      count: selectielijstRows.length,
    },
  ];

  return (
    <div
      className={cn(
        "bg-gray-100 shadow-lg transition-all duration-300 ease-in-out border-l h-full",
        isOpen ? "w-[30%]" : "w-0 opacity-0 overflow-hidden"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="border-b p-4">
          <h2 className="text-xl font-semibold mb-4">Bronnen</h2>

          {/* Search bar */}
          <div className="flex w-full items-center mb-4 gap-2">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                className="w-full pl-10 pr-3 py-2 border rounded-full bg-white"
                placeholder="Bronnen doorzoeken"
              />
            </div>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="rounded-full">
                    <ArrowDownUp className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Optie A</DropdownMenuItem>
                  <DropdownMenuItem>Optie B</DropdownMenuItem>
                  <DropdownMenuItem>Optie C</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Filter buttons */}
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <Button
                key={f.id}
                variant="outline"
                size="sm"
                onClick={() => setFilter(f.id as TFilter)}
                className={cn(
                  "text-xs rounded-full border-2",
                  filter === f.id && "border-lichtblauw"
                )}
              >
                {f.name} {f.count !== null && `(${f.count})`}
              </Button>
            ))}
          </div>
        </div>

        {/* Sources content */}
        <SidebarContent />
      </div>
    </div>
  );
}
