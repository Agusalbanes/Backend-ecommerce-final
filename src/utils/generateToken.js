import jwt from "jsonwebtoken"
import { SECRET } from "../../config.js"

// Genera un token nuevo con los datos del usuario
export function generateToken(user) {
  const payload = {
    id: user._id,
    email: user.email,
    name: user.name,
    role: user.role
  }

  return jwt.sign(payload, SECRET, { expiresIn: "7d" })
}
