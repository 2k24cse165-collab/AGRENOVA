import { Router } from "express";
import {
  listListings,
  getListing,
  createListing,
  updateListing,
  deleteListing,
  myListings,
} from "../controllers/listingController.js";
import { protect, authorize } from "../middleware/auth.js";
import { uploadListingImage } from "../middleware/upload.js";

const router = Router();

// Public browse
router.get("/", listListings);

// Farmer-only — MUST be before /:id so "me" is not treated as a listing id
router.get("/me/listings", protect, authorize("farmer"), myListings);

router.get("/:id", getListing);
router.post("/", protect, authorize("farmer"), uploadListingImage, createListing);
router.patch("/:id", protect, authorize("farmer", "admin"), uploadListingImage, updateListing);
router.delete("/:id", protect, authorize("farmer", "admin"), deleteListing);

export default router;
