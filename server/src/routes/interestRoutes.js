import express from "express";
import { InterestController } from "../controllers/interestController.js";

import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

// Public route to get all interests
router.get("/", asyncHandler(InterestController.getAllInterests));


export default router;