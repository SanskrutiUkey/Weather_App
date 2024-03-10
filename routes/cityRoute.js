import express from "express"
import { createCityController, getCityController } from "../controller/cityController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router()

router.get('/get-cities/:userId', authMiddleware, getCityController)
router.post('/create-city/:userId', authMiddleware, createCityController)

export default router;
