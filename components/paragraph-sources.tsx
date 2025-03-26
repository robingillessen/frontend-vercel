import React from "react";
import { Source } from "@/lib/types";
import { useSidebarStore } from "@/store/sidebar-store";
import { getTailwindClasses } from "@/lib/utils";
import { cn } from "@/lib/utils";

export const ParagraphSources = ({ id }: { id: string }) => {
  const { legalData } = useSidebarStore();
  const source = legalData?.answer.sources.find((source) => source.id === id);

  if (!source) return null;

  // TODO: decide background color based on source type

  return (
    <div className="">
      <div
        className={cn(
          getTailwindClasses(source.type),
          "size-8 place-content-center grid rounded-md cursor-pointer bg-transparent border-2"
        )}
        key={id}
      >
        {id.split("_")[1]}
      </div>
    </div>
  );
};
