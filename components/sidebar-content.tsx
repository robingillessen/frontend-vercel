"use client";

import { useSidebarStore } from "@/store/sidebar-store";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Filter, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SidebarSourcesSkeleton } from "@/components/skeleton-loaders/sidebar-sources-skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
