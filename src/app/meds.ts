import { z } from "zod";
import medsData from "../data/meds.json";
export const medSchema = z.object({
  name: z.string(),
  url: z.string(),
  description: z.string(),
});

export type Med = z.infer<typeof medSchema>;

export const meds = z.array(z.array(medSchema)).parse(medsData).flat();

export const findMeds = (s: string): Med[] =>
  meds.filter((m) => m.name.includes(s));
