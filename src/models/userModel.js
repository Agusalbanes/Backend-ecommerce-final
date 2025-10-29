import mongoose from 'mongoose'
import { isGoodPassword } from '../utils/validators.js'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 20,
        minlength: 2,
        trim: true,
        lowercase: true,
    },

    lastName: {
        type: String,
        required: true,
        maxlength: 20,
        minlength: 2,
        trim: true,
        lowercase: true
    },

    email: {
        type: String,
        required: true,
        maxlength: 30,
        minlength: 6,
        trim: true,
        lowercase: true,
        unique: true,
        match: /^\S+@\S+\.\S+$/,
    },

    age: {
        type: Number,
        required: true,
        min: 16,
        max: 110,
    },

    password: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return isGoodPassword(value)
            },
            message: 
            "Password must be between 6 and 12 characters, with at least one number, one uppercase letter and one lowercase letter"
        }
    },

    role: {
        type: String,
        enum: ["user", "admin"], 
        default: "user" 
    }

}, {
    timestamps: true
})

userSchema.pre("save", function (next) {
    if (this.isModified("password")) { 
        this.password = bcrypt.hashSync(this.password, 10)
    }
    next()
})

export default mongoose.model("user", userSchema)
