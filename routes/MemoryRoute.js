import {
  getMemory,
  getMemoryById,
  getMemoryByType,
  createMemory,
  updateMemory,
  deleteMemory,
} from "../controllers/MemoryController.js";
import express from "express";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();
router.get("/api/v1/memory", verifyUser, getMemory);
router.get("/api/v1/memory/:id", verifyUser, getMemoryById);
router.get("/api/v1/memory/type/:type", getMemoryByType);
router.post("/api/v1/memory", verifyUser, createMemory);
router.patch("/api/v1/memory/:id", verifyUser, updateMemory);
router.delete("/api/v1/memory/:id", verifyUser, deleteMemory);

export default router;
