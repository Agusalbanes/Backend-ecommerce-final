import express from 'express';
import { register, login, requestPasswordReset, resetPassword } from '../controllers/authController.js';

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", requestPasswordReset); // Nueva ruta
router.post("/reset-password", resetPassword); // Nueva ruta

export default router;
