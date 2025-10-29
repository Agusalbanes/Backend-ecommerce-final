import { verifyToken } from '../utils/verifyToken.js'

const verifyTokenMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer")){
            return res.status(400).json({ message: "Token de acceso no proporcionado" })
        }

        // Separamos "bearer" del resto del token y tomamos solo el token
        const token = authHeader.split(" ")[1]
        const decoded = verifyToken(token)

        req.user = decoded
        next()
    } catch (error) {
        return res.status(400).json({ message: "Token de acceso invalido", error: error.message })
    }
}

export default verifyTokenMiddleware