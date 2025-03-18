import { bins, type Bin, type InsertBin } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getBins(): Promise<Bin[]>;
  getBin(id: number): Promise<Bin | undefined>;
  updateBinLevels(id: number, organicLevel: number, recyclableLevel: number): Promise<Bin>;
  emptyBin(id: number): Promise<Bin>;
  createBin(bin: InsertBin): Promise<Bin>;
}

export class DatabaseStorage implements IStorage {
  async getBins(): Promise<Bin[]> {
    return await db.select().from(bins);
  }

  async getBin(id: number): Promise<Bin | undefined> {
    const [bin] = await db.select().from(bins).where(eq(bins.id, id));
    return bin;
  }

  async updateBinLevels(id: number, organicLevel: number, recyclableLevel: number): Promise<Bin> {
    const [bin] = await db
      .update(bins)
      .set({ organicLevel, recyclableLevel })
      .where(eq(bins.id, id))
      .returning();

    if (!bin) throw new Error("Bin not found");
    return bin;
  }

  async emptyBin(id: number): Promise<Bin> {
    const [bin] = await db
      .update(bins)
      .set({ organicLevel: 0, recyclableLevel: 0 })
      .where(eq(bins.id, id))
      .returning();

    if (!bin) throw new Error("Bin not found");
    return bin;
  }

  async createBin(insertBin: InsertBin): Promise<Bin> {
    const [bin] = await db
      .insert(bins)
      .values(insertBin)
      .returning();
    return bin;
  }
}

export const storage = new DatabaseStorage();