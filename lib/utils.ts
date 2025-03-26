import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { SourceType } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export async function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export const getTailwindClasses = (sourceType: SourceType) => {
  switch (sourceType) {
    case SourceType.TAXONOMY:
      return "bg-yellow-500 border-yellow-500";
    case SourceType.LAW:
      return "bg-green-100 text-green-800 border-green-100";
    case SourceType.CASE_LAW:
      return "bg-blue-100 text-blue-800 border-blue-100";
    case SourceType.SELECTIELIJST:
      return "bg-purple-100 text-purple-800 border-purple-100";
    default:
      return "";
  }
};
