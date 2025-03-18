import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from "./storage";
import { wasteClassificationSchema, insertBinSchema } from "@shared/schema";
import { classifyWasteImage } from "./gemini";
import dotenv from 'dotenv'; //i have added

dotenv.config();//i have added
export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);
  const wss = new WebSocketServer({ server: httpServer, path: "/ws" });

  // Broadcast to all connected clients
  function broadcast(data: any) {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  }

  // Get all bins
  app.get("/api/bins", async (_req, res) => {
    const bins = await storage.getBins();
    res.json(bins);
  });

  // Get specific bin
  app.get("/api/bins/:id", async (req, res) => {
    const bin = await storage.getBin(parseInt(req.params.id));
    if (!bin) return res.status(404).json({ message: "Bin not found" });
    res.json(bin);
  });

  // Create new bin
  app.post("/api/bins", async (req, res) => {
    const result = insertBinSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid request body" });
    }

    const bin = await storage.createBin(result.data);
    broadcast({ type: "bin_created", bin });
    res.json(bin);
  });

  // Empty bin
  app.post("/api/bins/:id/empty", async (req, res) => {
    try {
      const bin = await storage.emptyBin(parseInt(req.params.id));
      broadcast({ type: "bin_updated", bin });
      res.json(bin);
    } catch (error) {
      res.status(404).json({ message: "Bin not found" });
    }
  });

  // // Classify waste
  // app.post("/api/classify", async (req, res) => {
  //   console.log("heloo");
  //   // const result = wasteClassificationSchema.safeParse(req.body);
  //   // console.log(result);
  //   // if (!result.success) {
  //   //   return res.status(400).json({ message: "Invalid request body" });
  //   // }

  //   try {
  //     // const { imageUrl } = result.data;
  //     const { imageUrl } = req.body
  //     const binId = parseInt(req.query.binId as string);

  //     const bin = await storage.getBin(binId);
  //     if (!bin) return res.status(404).json({ message: "Bin not found" });

  //     // Use Gemini to classify the waste
  //     const type = await classifyWasteImage(imageUrl);
  // Endpoint to classify waste
  app.post("/api/classify", async (req, res) => {
    try {
      console.log("Received classification request");

      // Extract base64 image from request body
      const { imageUrl } = req.body;
      console.log("-----------------this line85-----------------------")
      if (!imageUrl) {
        return res.status(400).json({ message: "Missing imageUrl in request body" });
      }

      // Extract binId from query params
      // const binId = parseInt(req.query.binId as string);
      // if (isNaN(binId)) {
      //   return res.status(400).json({ message: "Invalid binId" });
      // }

      // Simulated bin storage check (Replace with actual DB lookup)
      // const bin = { id: binId, name: "Test Bin" }; // Mock data
      // if (!bin) {
      //   return res.status(404).json({ message: "Bin not found" });
      // }
      //const binId = parseInt(req.query.binId as string);
      // const binId = 6; // Replace with actual bin ID

      const binId = parseInt(req.query.binId as string);
          const bin = await storage.getBin(binId);
          if (!bin) return res.status(404).json({ message: "Bin not found" });

      // Classify image using AI model
      console.log("-----------------this line-----------------------")
      const type = await classifyWasteImage(imageUrl);
      const increment = 10;
      const updatedBin = await storage.updateBinLevels(
        binId,
        type === "organic" ? bin.organicLevel + increment : bin.organicLevel,
        type === "recyclable"
          ? bin.recyclableLevel + increment
          : bin.recyclableLevel,
      );

      broadcast({ type: "bin_updated", bin: updatedBin });
      res.json({ success: true, type, bin: updatedBin });
    } catch (error) {
      console.error("Classification error:", error);
      res.status(500).json({ message: "Failed to classify waste" });
    }
  });

  return httpServer;
}
