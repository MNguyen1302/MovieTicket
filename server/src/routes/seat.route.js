import express from "express";
import seatController from "../controllers/seat.controller.js";

const router = express.Router({ mergeParams: true });

router.get("/:roomId", seatController.getList);

export default router;