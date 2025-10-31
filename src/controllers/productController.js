import { 
    createProductService, 
    deleteProductService, 
    updateProductService, 
    getProductsService,
    getProductByIdService,
    findProductByNameService,  
    getStatusService           
} from "../services/productService.js"

export const createProduct = async (req, res, next) => {
    try {
        const savedProduct = await createProductService(req.body)
        return res.status(201).json(savedProduct)
    } catch (error) {
        next(error)
    }
}

export const getProducts = async (req, res, next) => {
    try {
        const products = await getProductsService()
        return res.status(200).json(products)
    } catch (error) {
        next(error)
    }
}

export const findProductByName = async (req, res, next) => {
    try {
        const { name } = req.query;
        if (!name) {
            return res.status(400).json({ 
                success: false, 
                message: "El parámetro 'name' es requerido" 
            });
        }
        const product = await findProductByNameService(name)
        return res.status(200).json(product)
    } catch (error) {
        next(error)
    }
}

export const findProductById = async (req, res, next) => {
    try {
        const product = await getProductByIdService(req.params.id)
        return res.status(200).json(product)
    } catch (error) {
        next(error)
    }
}

export const updateProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const updatedProduct = await updateProductService(productId, req.body)
        res.status(200).json(updatedProduct)
    } catch (error) {
        next(error)
    }
}

export const deleteProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await deleteProductService(productId)
        res.status(200).json(deletedProduct)
    } catch (error) {
        next(error)
    }
}

export const getStatus = async (req, res, next) => {
    try {
        const status = await getStatusService()
        return res.status(200).json(status)
    } catch (error) {
        next(error)
    }
}