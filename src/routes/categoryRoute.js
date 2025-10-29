import express from 'express';
import { 
    createCategory, 
    getCategories, 
    getCategoryById, 
    updateCategory, 
    deleteCategory 
} from '../controllers/categoryController.js';
import verifyToken from '../middlewares/verifyTokenMiddleware.js';
import verifyAdmin from '../middlewares/adminMiddleware.js';

const router = express.Router();

// Públicas - cualquiera puede ver categorías
router.get('/', getCategories);
router.get('/:id', getCategoryById);

// Protegidas - solo admin puede crear, editar, eliminar
router.post('/', verifyToken, verifyAdmin, createCategory);
router.put('/:id', verifyToken, verifyAdmin, updateCategory);
router.delete('/:id', verifyToken, verifyAdmin, deleteCategory);

export default router;