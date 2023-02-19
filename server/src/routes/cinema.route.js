import express from "express";
import cinemaController from "../controllers/cinema.controller.js";

const router = express.Router({ mergeParams: true });

router.get("/all", cinemaController.getList);

router.get("/:movieId", cinemaController.getCinemaBySchedule);

router.get("/combo/:cluster", cinemaController.getListCombo);

export default router;