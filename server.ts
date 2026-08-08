import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "Lumina Dental API" });
  });

  // AI Concierge Assistant API Endpoint
  app.post("/api/ai/concierge", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({
          error: "GEMINI_API_KEY environment variable is not configured.",
        });
      }

      const { message, history } = req.body;
      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "A valid message string is required." });
      }

      const ai = new GoogleGenAI({ apiKey });

      const systemInstruction = `You are Lumina AI Concierge, a helpful, polite, and reassuring dental assistant for Lumina Dental Seattle (located at 1420 5th Ave, Seattle, WA 98101, Phone: (206) 555-8901).
Your tone is professional, calming, precise, and warm ("Professional Precision, Patient Peace").
You can answer questions about:
- Practice offerings: Routine Cleaning & Exam, Teeth Whitening, Emergency Dental Care, Cosmetic Veneers, Dental Implants, Invisalign, Restorative Crowns & Fillings.
- The Team: Dr. Alex Chen (Cosmetic & Implant Specialist), Dr. Sarah Jenkins (General & Restorative Dentist), Dr. Marcus Vance (Orthodontics & Aligners), Dr. Elena Rostova (Periodontist & Preventative Care).
- Practice policies: Accepts major insurances (Delta Dental, Premera, Cigna, MetLife), offers flexible payment plans, open Mon-Fri 8am-5pm and Saturday 9am-2pm by appointment.
- Dental advice & triage: Provide helpful, safe educational context (e.g., for toothache: rinse with warm salt water, take over-the-counter pain relievers if appropriate, recommend booking an emergency appointment immediately).
- Keep responses concise (2-4 bullet points or short paragraphs). Always gently invite the patient to schedule an appointment via Lumina's online booking system.`;

      const contents = [];
      if (Array.isArray(history)) {
        for (const item of history) {
          contents.push({
            role: item.role === "user" ? "user" : "model",
            parts: [{ text: item.text }],
          });
        }
      }
      contents.push({
        role: "user",
        parts: [{ text: message }],
      });

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      return res.json({
        reply: response.text || "Thank you for reaching out to Lumina Dental Seattle. How else may I assist you with your appointment today?",
      });
    } catch (err: any) {
      console.error("Error in AI Concierge API:", err);
      return res.status(500).json({
        error: "Failed to generate AI response. Please try again later.",
        details: err?.message || String(err),
      });
    }
  });

  // Vite middleware in development vs static dist serve in production
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Lumina Dental Seattle Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
