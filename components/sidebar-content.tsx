"use client";

import { useSidebarStore } from "@/store/sidebar-store";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { SidebarSourcesSkeleton } from "@/components/skeleton-loaders/sidebar-sources-skeleton";
import FileUpload from "./file-upload";
import { LawArticles } from "./law-articles";
import { Werkwijzes } from "./werkwijzes";
import { Taxonomy } from "./taxonomy";
import { Selectielijst } from "./selectielijst";

export function SidebarContent() {
  const { lawArticles, werkwijzes, taxonomyTerms, selectielijstRows, isEmpty } =
    useSidebarStore();

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="font-semibold text-lg mb-2">
        Geindexeerde bronnen
      </SidebarGroupLabel>
      <FileUpload />
      <SidebarGroupContent>
        <SidebarMenu>
          {isEmpty ? (
            <SidebarSourcesSkeleton />
          ) : (
            <>
              <LawArticles lawArticles={lawArticles} />
              <Werkwijzes werkwijzes={werkwijzes} />
              <Taxonomy taxonomyTerms={taxonomyTerms} />
              <Selectielijst selectielijstRows={selectielijstRows} />
            </>
          )}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
