import express from "express";
import {
  getStorage,
  getStorageById,
  getStorageBySlot,
  createStorage,
  updateStorage,
  deleteStorage,
} from "../controllers/StorageController.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/api/v1/storage", verifyUser, getStorage);
router.get("/api/v1/storage/:id", verifyUser, getStorageById);
router.get("/api/v1/storage/slotType/:slotType", verifyUser, getStorageBySlot);
router.post("/api/v1/storage", verifyUser, createStorage);
router.patch("/api/v1/storage/:id", verifyUser, updateStorage);
router.delete("/api/v1/storage/:id", verifyUser, deleteStorage);

export default router;
