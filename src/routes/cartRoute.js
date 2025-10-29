import express from "express"
import {
    getCart,
    addToCart,
    updateCartItem,
    removeCartItem,
    clearUserCart
} from "../controllers/cartController.js"

import { authRequired } from "../middlewares/authMiddlewere.js"

const router = express.Router()

router.use(authRequired) 

router.get("/", getCart)
router.post("/add", addToCart)
router.put("/update", updateCartItem)
router.delete("/remove", removeCartItem)
router.delete("/clear", clearUserCart)

export default router
