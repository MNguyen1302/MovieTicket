import express from "express";
import cinemaController from "../controllers/cinema.controller.js";

const router = express.Router({ mergeParams: true });

router.get("/all", cinemaController.getList);

router.get("/:cluster", cinemaController.getCinemaByCluster);

export default router;