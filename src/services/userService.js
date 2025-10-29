import { SECRET } from "../../config.js";
import User from "../models/userModel.js"
import { findUserByIdAndCheck } from "../utils/userHelpers.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const createUserService = async (userData) => {
    const userExists = await User.findOne({ email: userData.email });
    if (userExists) {
        const error =new Error("User with this email already exists")
        error.status = 400;
        throw error
    }
    const newUser = new User(userData);
    await newUser.save()

    return { message: "User created" }
}

export const getUsersService = async () => {
    const users = await User.find()
    if (users.length === 0) {
        const error = new Error("There are no users")
        error.statusCode = 404
        throw error
    }

    return users
}

export const deleteUserService = async (userId) => {
    await findUserByIdAndCheck(userId)
    await User.findByIdAndDelete(userId)
    return { message: "User deleted succesfully" }
};

export const updateUserService = async (userId, updateData) => {
    await findUserByIdAndCheck(userId)
    if (updateData.password) {
        updateData.password = bcrypt.hashSync(updateData.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate({ _id: userId }, updateData, { new: true });
    if (!updatedUser) {
        const error = new Error("Failed to update user")
        error.statusCode = 500
        throw error
    }
    return updatedUser;
}

export const validateUserService = async (email, password) => {
    if (!(email && password)) {
        const error = new Error("There's a missing field");
        error.statusCode = 400;
        throw error;
    }
    const userFound = await User.findOne({ email })

    if (!userFound) {
        const error = new Error("User or password are incorrect")
        error.statusCode = 400;
        throw error;
    }
    const isPasswordValid = bcrypt.compareSync(password, userFound.password);
    if (!isPasswordValid) {
        const error = new Error("User or password are incorrect")
        error.statusCode = 400;
        throw error;
    }

    const payload = {
        userId: userFound._id,
        userEmail: userFound.email,
        role: userFound.role,
    }

    const token = jwt.sign(payload, SECRET, { expiresIn: "1h" })

    return { 
        message: "Logged in", 
        token,
        role: userFound.role, 
        user:{
            id: userFound._id,
            name: userFound.name,
            lastName: userFound.lastName,
            email: userFound.email,
        }
    }
}