import { verifyToken } from "../utils/verifyToken.js"

export function authRequired(req, res, next) {
    const header = req.headers.authorization
    if (!header || !header.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No autorizado" })
    }

    const token = header.split(" ")[1]

    try {
        const decoded = verifyToken(token)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({ message: "Token inválido o expirado" })
    }
}
export function adminRequired (req, res, next) {
    if (!req.user) {
        return res.status(401).json({message:"No autorizado"})
    }
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Acceso prohibido: sólo admins"})
    }
    next()
}