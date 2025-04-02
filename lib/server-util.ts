"use server";

import mockData from "../data4.json";
import { LegalData } from "./types";

// This is a server action that returns mock data from temp.json
export async function getMockResponse(): Promise<LegalData> {
  // delay the response
  await new Promise((resolve) => setTimeout(resolve, 4000));
  try {
    return mockData as LegalData;
    // return await fetch("http://localhost:3000/api/mock-response").then((res) => res.json());
  } catch (error) {
    console.error("Error getting mock response:", error);
    throw new Error("Failed to get mock response");
  }
}
