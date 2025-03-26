import React from "react";
import { Badge } from "./ui/badge";
import { SourceType } from "@/lib/types";
import { getTailwindClasses } from "@/lib/utils";

export const SourceBadgeText = ({ sourceType }: { sourceType: SourceType }) => {
  return (
    <Badge variant="outline" className={getTailwindClasses(sourceType)}>
      {sourceType}
    </Badge>
  );
};
