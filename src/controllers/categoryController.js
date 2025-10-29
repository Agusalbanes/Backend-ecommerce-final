import { 
    createCategoryService, 
    deleteCategoryService, 
    getCategoriesService, 
    getCategoryByIdService,
    updateCategoryService 
} from "../services/categoryService.js"

export const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        
        if (!name) {
            return res.status(400).json({ 
                success: false,
                message: "El nombre de la categoría es requerido" 
            });
        }

        const savedCategory = await createCategoryService(name);
        return res.status(201).json({ 
            success: true,
            message: "Categoría creada exitosamente", 
            data: savedCategory 
        });
    } catch (error) {
        if (error.code === 11000) { 
            return res.status(400).json({ 
                success: false,
                message: "La categoría ya existe" 
            });
        }
        return res.status(500).json({ 
            success: false,
            message: "Error interno del servidor", 
            error: error.message 
        });
    }
}

export const getCategories = async (req, res) => {
    try {
        const categories = await getCategoriesService();
        
        if (!categories || categories.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No hay categorías disponibles",
                data: []
            });
        }
        
        return res.status(200).json({
            success: true,
            data: categories
        });
    } catch (error) {
        return res.status(500).json({ 
            success: false,
            message: "Error interno del servidor", 
            error: error.message 
        });
    }
}

export const getCategoryById = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await getCategoryByIdService(categoryId);
        
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Categoría no encontrada"
            });
        }
        
        return res.status(200).json({
            success: true,
            data: category
        });
    } catch (error) {
        return res.status(500).json({ 
            success: false,
            message: "Error interno del servidor", 
            error: error.message 
        });
    }
}

export const updateCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const { name } = req.body;
        
        if (!name) {
            return res.status(400).json({ 
                success: false,
                message: "El nombre de la categoría es requerido" 
            });
        }

        const updatedCategory = await updateCategoryService(categoryId, name);
        
        if (!updatedCategory) {
            return res.status(404).json({
                success: false,
                message: "Categoría no encontrada"
            });
        }
        
        return res.status(200).json({
            success: true,
            message: "Categoría actualizada exitosamente",
            data: updatedCategory
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ 
                success: false,
                message: "Ya existe una categoría con ese nombre" 
            });
        }
        return res.status(500).json({ 
            success: false,
            message: "Error interno del servidor", 
            error: error.message 
        });
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const deletedCategory = await deleteCategoryService(categoryId);
        
        if (!deletedCategory) {
            return res.status(404).json({
                success: false,
                message: "Categoría no encontrada"
            });
        }
        
        return res.status(200).json({
            success: true,
            message: "Categoría eliminada exitosamente",
            data: deletedCategory
        });
    } catch (error) {
        if (error.statusCode === 400) {
            return res.status(400).json({ 
                success: false,
                message: error.message 
            });
        }
        return res.status(500).json({ 
            success: false,
            message: "Error interno del servidor", 
            error: error.message 
        });
    }
}