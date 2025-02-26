"use server";

import mockData from "../temp.json";
import { LegalData } from "./types";

// This is a server action that returns mock data from temp.json
export async function getMockResponse(): Promise<LegalData> {
  // delay the response
  await new Promise((resolve) => setTimeout(resolve, 1000));
  try {
    return mockData as LegalData;
  } catch (error) {
    console.error("Error getting mock response:", error);
    throw new Error("Failed to get mock response");
  }
}
