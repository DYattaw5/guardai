import { Router } from "express";

const router = Router();

router.get("/", (_, res) => {
  res.json({
    company: "Guard Landscaping",
    api: "online",
    version: "1.0.0",
    message: "Guard Landscaping AI is running."
  });
});

router.get("/health", (_, res) => {
  res.json({
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

export default router;
