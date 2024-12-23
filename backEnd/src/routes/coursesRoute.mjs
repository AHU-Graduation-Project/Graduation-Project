import express from "express";
import { searchCourses } from "../controllers/coursesController.mjs";

const router = express.Router();

router.get("/getCourses", searchCourses);

export default router;
