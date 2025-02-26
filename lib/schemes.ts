import { z } from "zod";

export const schema = z.object({
    text: z
      .string()
      .min(1, { message: "Vul een vraag in" })
      .refine((text) => text.length < 100, { message: "Vraag is te lang" }),
  });