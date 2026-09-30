import { Router } from "express";
import rateLimit from "express-rate-limit";
import { chatWithAssistant } from "../controllers/aiController.js";

const router = Router();

router.use(rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
}));

router.post("/chat", chatWithAssistant);

export default router;
