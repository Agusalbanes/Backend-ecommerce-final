import { createUserService, deleteUserService, getUsersService, updateUserService, validateUserService } from "../services/userService.js"

export const createUser = async (req, res, next) => {
    try {
        const response = await createUserService(req.body)
        res.status(201).json(response)
    } catch (error) {
        next(error)
    }
}

// Obtener todos los usuarios
export const getUsers = async (req, res, next) => {
    try {
        const users = await getUsersService()
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}

// Borrar el usuario
export const deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.id
        const result = await deleteUserService(userId)
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

// Actualizamos usuario
export const updateUser = async (req, res, next) => {
    try {
        const userId = req.params.id
        const updatedUser = await updateUserService(userId, req.body)
        res.status(201).json(updatedUser)
    } catch (error) {
        next(error)
    }
}

// Autenticar/validar al usuario
export const validate = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const result = await validateUserService(email, password)
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

import User from '../models/userModel.js';


export const createAdmin = async (req, res) => {
    try {
        const existingAdmin = await User.findOne({ email: 'admin@ecommerce.com' });
        if (existingAdmin) {
            return res.status(400).json({
                success: false,
                message: 'El usuario admin ya existe'
            });
        }

        const adminUser = new User({
            name: 'admin',
            lastName: 'sistema',
            email: 'admin@ecommerce.com',
            age: 30,
            password: 'Admin123', 
            role: 'admin'
        });

        await adminUser.save();

        return res.status(201).json({
            success: true,
            message: 'Usuario admin creado exitosamente',
            data: {
                id: adminUser._id,
                email: adminUser.email,
                role: adminUser.role,
                name: adminUser.name
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error creando usuario admin',
            error: error.message
        });
    }
};