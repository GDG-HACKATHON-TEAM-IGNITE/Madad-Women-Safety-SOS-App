import express from "express";
import {
  registerPoliceDevice,
  verifyPoliceDevice,
} from "../controllers/station.js";

const router = express.Router();

router.post("/send-otp", registerPoliceDevice);
router.post("/verify-otp", verifyPoliceDevice);

export default router;
