import mongoose from 'mongoose';

const resetTokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    token: {
        type: String,
        required: true,
        unique: true
    },
    expiresAt: {
        type: Date,
        required: true,
        default: () => new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 horas desde ahora
    }
}, {
    timestamps: true
});

// Crear índice TTL para eliminación automática después de 24 horas
resetTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// ✅ CORREGIR: usar resetTokenSchema en lugar de resetTokenModel
export default mongoose.model('ResetToken', resetTokenSchema);