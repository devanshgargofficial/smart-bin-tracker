import { pgTable, text, serial, integer, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const bins = pgTable("bins", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  latitude: decimal("latitude", { precision: 10, scale: 8 }).notNull(),
  longitude: decimal("longitude", { precision: 11, scale: 8 }).notNull(),
  organicLevel: integer("organic_level").notNull().default(0),
  recyclableLevel: integer("recyclable_level").notNull().default(0)
});

export const insertBinSchema = createInsertSchema(bins).omit({ id: true });

export type InsertBin = z.infer<typeof insertBinSchema>;
export type Bin = typeof bins.$inferSelect;

export const wasteClassificationSchema = z.object({
  imageUrl: z.string().url(),
  type: z.enum(["organic", "recyclable"])
});

export type WasteClassification = z.infer<typeof wasteClassificationSchema>;
