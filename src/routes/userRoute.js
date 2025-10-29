import express from 'express'
import { createUser, deleteUser, getUsers, updateUser, validate, createAdmin } from '../controllers/userController.js'



const userRoute = express.Router()

//AGREGAR ESTA RUTA TEMPORAL - ELIMINAR DESPUÉS
userRoute.post('/create-admin', createAdmin);

userRoute.post("/create", createUser)
userRoute.get("/getUsers", getUsers)
userRoute.delete("/deleteUser/:id", deleteUser)
userRoute.patch("/updateUser/:id", updateUser)
userRoute.post("/login", validate)

export default userRoute
