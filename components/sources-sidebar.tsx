"use client";

import { useSidebarStore } from "@/store/sidebar-store";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react"; // Make sure you have lucide-react installed
import { useState } from "react";
import { SidebarContent } from "./sidebar-content";

export function SourcesSidebar() {
  const { isOpen, closeSidebar } = useSidebarStore();

  // Example filter categories - replace with your actual data
  const filters = [
    { id: "all", name: "Alles", count: null },
    { id: "wetten", name: "Wetten", count: 6 },
    { id: "werkwijzers", name: "Werkwijzers", count: 2 },
    { id: "jurisprudentie", name: "Jurisprudentie", count: 27 },
  ];

  const [activeFilter, setActiveFilter] = useState("all");

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
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              className="w-full pl-10 pr-3 py-2 border rounded-md"
              placeholder="Bronnen doorzoeken"
            />
            <Button
              variant="outline"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              Filter
            </Button>
          </div>

          {/* Filter buttons */}
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(filter.id)}
                className="text-xs"
              >
                {filter.name} {filter.count !== null && `(${filter.count})`}
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
