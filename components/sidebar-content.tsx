"use client";

import { useSidebarStore } from "@/store/sidebar-store";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { SidebarSourcesSkeleton } from "@/components/skeleton-loaders/sidebar-sources-skeleton";
import { LawArticles } from "./sources/law-articles";
import { Werkwijzes } from "./sources/werkinstructie";
import { Taxonomy } from "./sources/taxonomy";
import { Selectielijst } from "./sources/selectielijst";
import { CaseLaw } from "./sources/case-law";
import FileUpload from "./ui/file-upload";

export function SidebarContent() {
  const {
    lawArticles,
    caseLawSources,
    taxonomySources,
    selectielijstSources,
    isEmpty,
  } = useSidebarStore();

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
              <CaseLaw caseLawSources={caseLawSources} />
              {/* <Werkwijzes werkwijzes={werkwijzes} /> */}
              <Taxonomy taxonomyTerms={taxonomySources} />
              <Selectielijst selectielijstRows={selectielijstSources} />
            </>
          )}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
