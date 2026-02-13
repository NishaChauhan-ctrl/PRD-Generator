import { sql } from "drizzle-orm";
import { pgTable, text, varchar, serial, integer, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const conversations = pgTable("conversations", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  conversationId: integer("conversation_id").notNull().references(() => conversations.id, { onDelete: "cascade" }),
  role: text("role").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const prds = pgTable("prds", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  idea: text("idea").notNull(),
  content: text("content").notNull(),
  shareId: text("share_id"),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const prdVersions = pgTable("prd_versions", {
  id: serial("id").primaryKey(),
  prdId: integer("prd_id").notNull().references(() => prds.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const toolResults = pgTable("tool_results", {
  id: serial("id").primaryKey(),
  toolType: text("tool_type").notNull(),
  input: text("input").notNull(),
  output: text("output").notNull(),
  shareId: text("share_id"),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const templates = pgTable("templates", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  idea: text("idea").notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

// Insert schemas
export const insertPrdSchema = createInsertSchema(prds).omit({ id: true, createdAt: true, updatedAt: true, shareId: true });
export const insertToolResultSchema = createInsertSchema(toolResults).omit({ id: true, createdAt: true, shareId: true });
export const insertTemplateSchema = createInsertSchema(templates).omit({ id: true, createdAt: true });

// Types
export type Prd = typeof prds.$inferSelect;
export type InsertPrd = z.infer<typeof insertPrdSchema>;
export type PrdVersion = typeof prdVersions.$inferSelect;
export type ToolResult = typeof toolResults.$inferSelect;
export type InsertToolResult = z.infer<typeof insertToolResultSchema>;
export type Template = typeof templates.$inferSelect;
export type InsertTemplate = z.infer<typeof insertTemplateSchema>;
export type Conversation = typeof conversations.$inferSelect;
export type Message = typeof messages.$inferSelect;
