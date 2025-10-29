import express from 'express'
import bodyParser from 'body-parser'
import { connectDB } from './db.js'
import { PORT, SECRET } from './config.js'
import userRoute  from './src/routes/userRoute.js'
import session from 'express-session'
import  categoryRoute  from './src/routes/categoryRoute.js'
import  productRoute  from './src/routes/productRoute.js'
import cors from 'cors'
import authRoutes from "./src/routes/authRoute.js"
import cartRoute from "./src/routes/cartRoute.js"
import { errorHandler } from "./src/middlewares/errorMiddleware.js"

const app = express()

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
}))

// Conexion a la base de datos
connectDB()


app.use(bodyParser.json())

// Parsear el cuerpo de la solicitud para que pueda ser leida
app.use(bodyParser.urlencoded({extended: true}))

// Generamos el uso de la sesion
app.use(
    session({
        secret: SECRET, 
        resave: false, 
        saveUninitialized: false, 
    })
)

//Rutas base 
app.use("/api/user", userRoute)
app.use("/api/category", categoryRoute)
app.use("/api/product", productRoute)
app.use("/api/auth", authRoutes)
app.use("/api/cart", cartRoute)
app.use(errorHandler)
// Crear la escucha del servidor, para hacerlo correr
app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`)
})
