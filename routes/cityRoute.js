import express from "express"
import { createCityController, deleteCityController, getCityController } from "../controller/cityController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router()

router.get('/get-cities/:userId', getCityController)
router.post('/create-city/:userId', authMiddleware, createCityController)
router.delete('/delete-city/:userId', authMiddleware, deleteCityController)





export default router;
