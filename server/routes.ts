import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPrdSchema, insertToolResultSchema, insertTemplateSchema } from "@shared/schema";
import {
  generatePRD,
  generateUserStories,
  refineProblem,
  prioritizeFeatures,
  planSprint,
  generateInterviewPrep,
  rewriteSection,
} from "./openai";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // --- PRD CRUD ---
  app.get("/api/prds", async (_req, res) => {
    const allPrds = await storage.getAllPrds();
    res.json(allPrds);
  });

  app.get("/api/prds/:id", async (req, res) => {
    const prd = await storage.getPrd(Number(req.params.id));
    if (!prd) return res.status(404).json({ error: "PRD not found" });
    res.json(prd);
  });

  app.post("/api/prds/generate", async (req, res) => {
    const { idea } = req.body;
    if (!idea || typeof idea !== "string" || idea.trim().length < 20) {
      return res.status(400).json({ error: "Idea must be at least 20 characters" });
    }
    try {
      const { title, content } = await generatePRD(idea);
      const prd = await storage.createPrd({ title, idea, content });
      res.status(201).json(prd);
    } catch (err: any) {
      console.error("PRD generation error:", err);
      res.status(500).json({ error: "Failed to generate PRD" });
    }
  });

  app.patch("/api/prds/:id", async (req, res) => {
    const { content } = req.body;
    if (!content) return res.status(400).json({ error: "Content is required" });
    const updated = await storage.updatePrd(Number(req.params.id), content);
    if (!updated) return res.status(404).json({ error: "PRD not found" });
    res.json(updated);
  });

  app.delete("/api/prds/:id", async (req, res) => {
    await storage.deletePrd(Number(req.params.id));
    res.status(204).send();
  });

  app.post("/api/prds/:id/share", async (req, res) => {
    const shareId = await storage.sharePrd(Number(req.params.id));
    res.json({ shareId });
  });

  app.get("/api/shared/:shareId", async (req, res) => {
    const prd = await storage.getPrdByShareId(req.params.shareId);
    if (!prd) return res.status(404).json({ error: "Shared PRD not found" });
    res.json(prd);
  });

  // --- PRD Versions ---
  app.get("/api/prds/:id/versions", async (req, res) => {
    const versions = await storage.getPrdVersions(Number(req.params.id));
    res.json(versions);
  });

  app.post("/api/prds/:id/versions/:versionId/restore", async (req, res) => {
    const restored = await storage.restorePrdVersion(
      Number(req.params.id),
      Number(req.params.versionId)
    );
    if (!restored) return res.status(404).json({ error: "Version not found" });
    res.json(restored);
  });

  // --- AI Tool Endpoints ---
  app.post("/api/tools/user-stories/generate", async (req, res) => {
    const { input } = req.body;
    if (!input) return res.status(400).json({ error: "Input is required" });
    try {
      const output = await generateUserStories(input);
      const result = await storage.createToolResult({ toolType: "user-stories", input, output });
      res.status(201).json(result);
    } catch (err: any) {
      console.error("User stories generation error:", err);
      res.status(500).json({ error: "Failed to generate user stories" });
    }
  });

  app.post("/api/tools/refine-problem/generate", async (req, res) => {
    const { input } = req.body;
    if (!input) return res.status(400).json({ error: "Input is required" });
    try {
      const output = await refineProblem(input);
      const result = await storage.createToolResult({ toolType: "refine-problem", input, output });
      res.status(201).json(result);
    } catch (err: any) {
      console.error("Problem refinement error:", err);
      res.status(500).json({ error: "Failed to refine problem" });
    }
  });

  app.post("/api/tools/prioritize-features/generate", async (req, res) => {
    const { input } = req.body;
    if (!input) return res.status(400).json({ error: "Input is required" });
    try {
      const output = await prioritizeFeatures(input);
      const result = await storage.createToolResult({ toolType: "prioritize-features", input, output });
      res.status(201).json(result);
    } catch (err: any) {
      console.error("Feature prioritization error:", err);
      res.status(500).json({ error: "Failed to prioritize features" });
    }
  });

  app.post("/api/tools/plan-sprint/generate", async (req, res) => {
    const { input } = req.body;
    if (!input) return res.status(400).json({ error: "Input is required" });
    try {
      const output = await planSprint(input);
      const result = await storage.createToolResult({ toolType: "plan-sprint", input, output });
      res.status(201).json(result);
    } catch (err: any) {
      console.error("Sprint planning error:", err);
      res.status(500).json({ error: "Failed to plan sprint" });
    }
  });

  app.post("/api/tools/interview-prep/generate", async (req, res) => {
    const { input } = req.body;
    if (!input) return res.status(400).json({ error: "Input is required" });
    try {
      const output = await generateInterviewPrep(input);
      const result = await storage.createToolResult({ toolType: "interview-prep", input, output });
      res.status(201).json(result);
    } catch (err: any) {
      console.error("Interview prep error:", err);
      res.status(500).json({ error: "Failed to generate interview prep" });
    }
  });

  app.post("/api/tools/rewrite-section", async (req, res) => {
    const { section, instructions } = req.body;
    if (!section || !instructions) return res.status(400).json({ error: "Section and instructions are required" });
    try {
      const output = await rewriteSection(section, instructions);
      res.json({ output });
    } catch (err: any) {
      console.error("Rewrite error:", err);
      res.status(500).json({ error: "Failed to rewrite section" });
    }
  });

  // --- Tool Results CRUD ---
  app.get("/api/tool-results", async (_req, res) => {
    const results = await storage.getAllToolResults();
    res.json(results);
  });

  app.get("/api/tool-results/:id", async (req, res) => {
    const result = await storage.getToolResult(Number(req.params.id));
    if (!result) return res.status(404).json({ error: "Tool result not found" });
    res.json(result);
  });

  app.delete("/api/tool-results/:id", async (req, res) => {
    await storage.deleteToolResult(Number(req.params.id));
    res.status(204).send();
  });

  app.post("/api/tool-results/:id/share", async (req, res) => {
    const shareId = await storage.shareToolResult(Number(req.params.id));
    res.json({ shareId });
  });

  // --- Templates ---
  app.get("/api/templates", async (_req, res) => {
    const allTemplates = await storage.getAllTemplates();
    res.json(allTemplates);
  });

  app.post("/api/templates", async (req, res) => {
    const parsed = insertTemplateSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.message });
    const template = await storage.createTemplate(parsed.data);
    res.status(201).json(template);
  });

  app.delete("/api/templates/:id", async (req, res) => {
    await storage.deleteTemplate(Number(req.params.id));
    res.status(204).send();
  });

  return httpServer;
}
