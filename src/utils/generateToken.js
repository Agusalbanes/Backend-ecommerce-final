import jwt from "jsonwebtoken"
import { SECRET } from "../../config.js"

export function generateToken(user) {
  const payload = {
    id: user._id,
    email: user.email,
    name: user.name,
    role: user.role
  }

  return jwt.sign(payload, SECRET, { expiresIn: "7d" })
}
