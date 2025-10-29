import userModel from "../models/userModel.js"
import ResetToken from '../models/resetTokenModel.js';
import bcrypt from "bcrypt"
import { generateToken } from "../utils/generateToken.js"
import crypto from 'crypto';

export async function register(req, res) {
    try {
        const { name, lastName, email, age, password } = req.body

        if (!name || !lastName || !email || !age || !password) {
            return res.status(400).json({ message: "Faltan campos obligatorios" })
        }

        const userExists = await userModel.findOne({ email })
        if (userExists) {
            return res.status(400).json({ message: "El usuario ya existe" })
        }

        const newUser = new userModel({ name, lastName, email, age, password })
        await newUser.save()

        const token = generateToken(newUser)

        res.status(201).json({
            message: "Usuario registrado correctamente",
            user: {
                id: newUser._id,
                name: newUser.name,
                lastName: newUser.lastName,
                email: newUser.email,
            },
            token,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error al registrar usuario" })
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: "Faltan datos" })
        }

        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ message: "Contraseña incorrecta" })
        }

        const token = generateToken(user)

        res.status(200).json({
            message: "Login exitoso",
            user: {
                id: user._id,
                name: user.name,
                lastName: user.lastName,
                email: user.email,
            },
            token,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error al iniciar sesión" })
    }
}

// SOLICITAR RESTABLECIMIENTO DE CONTRASEÑA
export async function requestPasswordReset(req, res) {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ 
                success: false,
                message: "El email es requerido" 
            });
        }

        // Verificar si el usuario existe
        const user = await userModel.findOne({ email });
        if (!user) {
            // Por seguridad, no revelar si el email existe o no
            return res.status(200).json({
                success: true,
                message: "Si el email existe, se enviarán instrucciones para restablecer la contraseña"
            });
        }

        // Generar token único
        const resetToken = crypto.randomBytes(32).toString('hex');
        
        // Guardar token en la base de datos
        const resetTokenDoc = new ResetToken({
            userId: user._id,
            token: resetToken
        });
        await resetTokenDoc.save();

        // En desarrollo: mostrar token en consola para testing
        console.log(`🔐 Token de restablecimiento para ${email}: ${resetToken}`);
        console.log(`🔗 Link de prueba: http://localhost:3000/api/auth/reset-password?token=${resetToken}`);
        
        res.status(200).json({
            success: true,
            message: "Si el email existe, se enviarán instrucciones para restablecer la contraseña",
            // En desarrollo, devolvemos el token para testing
            resetToken: resetToken
        });

    } catch (error) {
        console.error("Error en requestPasswordReset:", error);
        res.status(500).json({ 
            success: false,
            message: "Error al solicitar restablecimiento de contraseña" 
        });
    }
}

// RESTABLECER CONTRASEÑA CON TOKEN
export async function resetPassword(req, res) {
    try {
        const { token, newPassword } = req.body;

        if (!token || !newPassword) {
            return res.status(400).json({ 
                success: false,
                message: "Token y nueva contraseña son requeridos" 
            });
        }

        // Buscar token válido (no expirado)
        const resetToken = await ResetToken.findOne({ 
            token,
            expiresAt: { $gt: new Date() } // Mayor que la fecha actual
        });

        if (!resetToken) {
            return res.status(400).json({ 
                success: false,
                message: "Token inválido o expirado" 
            });
        }

        // Buscar usuario
        const user = await userModel.findById(resetToken.userId);
        if (!user) {
            return res.status(400).json({ 
                success: false,
                message: "Usuario no encontrado" 
            });
        }

        // Actualizar contraseña (se encriptará automáticamente por el pre-save hook)
        user.password = newPassword;
        await user.save();

        // Eliminar token usado
        await ResetToken.deleteOne({ _id: resetToken._id });

        res.status(200).json({
            success: true,
            message: "Contraseña restablecida exitosamente"
        });

    } catch (error) {
        console.error("Error en resetPassword:", error);
        res.status(500).json({ 
            success: false,
            message: "Error al restablecer contraseña" 
        });
    }
}