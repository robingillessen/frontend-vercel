import React from "react";
import { Source, SourceType, TaxonomySource } from "@/lib/types";
import { useSidebarStore } from "@/store/sidebar-store";
import { getTailwindClasses } from "@/lib/utils";
import { cn } from "@/lib/utils";

export const ParagraphSource = ({ id }: { id?: string }) => {
  const { legalData } = useSidebarStore();

  if (!id) return null;

  // First try to find the source directly
  let source = legalData?.answer.sources.find((source) => source.id === id);

  // If not found and it's a taxonomy source, look in the context array
  if (!source && id.startsWith("source_")) {
    const taxonomySource = legalData?.answer.sources.find(
      (s): s is TaxonomySource =>
        s.type === SourceType.TAXONOMY &&
        s.value.context.some((c) => c.id === id)
    );

    if (taxonomySource) {
      const contextItem = taxonomySource.value.context.find((c) => c.id === id);
      if (contextItem) {
        source = {
          id,
          type: SourceType.TAXONOMY,
          value: {
            label: taxonomySource.value.label,
            context: [contextItem],
          },
        };
      }
    }
  }

  if (!source) return null;

  return (
    <div className="">
      <div
        className={cn(
          getTailwindClasses(source.type),
          "size-8 place-content-center grid rounded-md cursor-pointer bg-transparent border-2"
        )}
        key={id}
      >
        {id?.split("_")[1]}
      </div>
    </div>
  );
};
