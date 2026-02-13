import { db } from "./db";
import { eq, desc } from "drizzle-orm";
import { prds, prdVersions, toolResults, templates, conversations, messages } from "@shared/schema";
import type { Prd, InsertPrd, PrdVersion, ToolResult, InsertToolResult, Template, InsertTemplate } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // PRDs
  getAllPrds(): Promise<Prd[]>;
  getPrd(id: number): Promise<Prd | undefined>;
  getPrdByShareId(shareId: string): Promise<Prd | undefined>;
  createPrd(prd: InsertPrd): Promise<Prd>;
  updatePrd(id: number, content: string): Promise<Prd | undefined>;
  deletePrd(id: number): Promise<void>;
  sharePrd(id: number): Promise<string>;

  // PRD Versions
  getPrdVersions(prdId: number): Promise<PrdVersion[]>;
  restorePrdVersion(prdId: number, versionId: number): Promise<Prd | undefined>;

  // Tool Results
  getAllToolResults(): Promise<ToolResult[]>;
  getToolResult(id: number): Promise<ToolResult | undefined>;
  getToolResultByShareId(shareId: string): Promise<ToolResult | undefined>;
  createToolResult(result: InsertToolResult): Promise<ToolResult>;
  deleteToolResult(id: number): Promise<void>;
  shareToolResult(id: number): Promise<string>;

  // Templates
  getAllTemplates(): Promise<Template[]>;
  createTemplate(template: InsertTemplate): Promise<Template>;
  deleteTemplate(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // PRDs
  async getAllPrds(): Promise<Prd[]> {
    return db.select().from(prds).orderBy(desc(prds.createdAt));
  }

  async getPrd(id: number): Promise<Prd | undefined> {
    const [prd] = await db.select().from(prds).where(eq(prds.id, id));
    return prd;
  }

  async getPrdByShareId(shareId: string): Promise<Prd | undefined> {
    const [prd] = await db.select().from(prds).where(eq(prds.shareId, shareId));
    return prd;
  }

  async createPrd(prd: InsertPrd): Promise<Prd> {
    const [created] = await db.insert(prds).values(prd).returning();
    return created;
  }

  async updatePrd(id: number, content: string): Promise<Prd | undefined> {
    const existing = await this.getPrd(id);
    if (!existing) return undefined;

    // Save current version as snapshot
    await db.insert(prdVersions).values({ prdId: id, content: existing.content });

    const [updated] = await db
      .update(prds)
      .set({ content, updatedAt: new Date() })
      .where(eq(prds.id, id))
      .returning();
    return updated;
  }

  async deletePrd(id: number): Promise<void> {
    await db.delete(prdVersions).where(eq(prdVersions.prdId, id));
    await db.delete(prds).where(eq(prds.id, id));
  }

  async sharePrd(id: number): Promise<string> {
    const shareId = randomUUID().slice(0, 8);
    await db.update(prds).set({ shareId }).where(eq(prds.id, id));
    return shareId;
  }

  // PRD Versions
  async getPrdVersions(prdId: number): Promise<PrdVersion[]> {
    return db.select().from(prdVersions).where(eq(prdVersions.prdId, prdId)).orderBy(desc(prdVersions.createdAt));
  }

  async restorePrdVersion(prdId: number, versionId: number): Promise<Prd | undefined> {
    const [version] = await db.select().from(prdVersions).where(eq(prdVersions.id, versionId));
    if (!version) return undefined;
    return this.updatePrd(prdId, version.content);
  }

  // Tool Results
  async getAllToolResults(): Promise<ToolResult[]> {
    return db.select().from(toolResults).orderBy(desc(toolResults.createdAt));
  }

  async getToolResult(id: number): Promise<ToolResult | undefined> {
    const [result] = await db.select().from(toolResults).where(eq(toolResults.id, id));
    return result;
  }

  async getToolResultByShareId(shareId: string): Promise<ToolResult | undefined> {
    const [result] = await db.select().from(toolResults).where(eq(toolResults.shareId, shareId));
    return result;
  }

  async createToolResult(result: InsertToolResult): Promise<ToolResult> {
    const [created] = await db.insert(toolResults).values(result).returning();
    return created;
  }

  async deleteToolResult(id: number): Promise<void> {
    await db.delete(toolResults).where(eq(toolResults.id, id));
  }

  async shareToolResult(id: number): Promise<string> {
    const shareId = randomUUID().slice(0, 8);
    await db.update(toolResults).set({ shareId }).where(eq(toolResults.id, id));
    return shareId;
  }

  // Templates
  async getAllTemplates(): Promise<Template[]> {
    return db.select().from(templates).orderBy(desc(templates.createdAt));
  }

  async createTemplate(template: InsertTemplate): Promise<Template> {
    const [created] = await db.insert(templates).values(template).returning();
    return created;
  }

  async deleteTemplate(id: number): Promise<void> {
    await db.delete(templates).where(eq(templates.id, id));
  }
}

export const storage = new DatabaseStorage();
