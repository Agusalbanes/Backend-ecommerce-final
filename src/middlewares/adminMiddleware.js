const verifyAdmin = (req, res, next) => {
    try {
        // Verificar si el usuario está autenticado y es admin
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Acceso denegado. Token requerido."
            });
        }

        if (req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: "Acceso denegado. Se requieren privilegios de administrador."
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al verificar permisos de administrador",
            error: error.message
        });
    }
};

export default verifyAdmin;