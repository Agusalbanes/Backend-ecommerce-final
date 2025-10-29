import express from 'express'
import { createProduct, getProducts, deleteProduct, findProductById, findProductByName, getStatus, updateProduct } from '../controllers/productController.js'
import { authRequired, adminRequired } from '../middlewares/authMiddlewere.js'

const productRoute = express.Router()

//Endpoints

productRoute.get("/", getProducts)
productRoute.get("/status", getStatus)
productRoute.get("/name", findProductByName)
productRoute.get("/find-by-id/:id", findProductById)

productRoute.post("/", authRequired, adminRequired, createProduct)
productRoute.put("/update/:id", authRequired, adminRequired, updateProduct)
productRoute.delete("/delete/:id", authRequired, adminRequired, deleteProduct)

export default productRoute