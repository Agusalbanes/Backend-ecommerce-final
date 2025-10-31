import Product, { statusEnum } from "../models/productModel.js";

// Crear un producto
export const createProductService = async (productData) => {
    if (!productData.name || !productData.price) {
        const error = new Error("Name and price are required");
        error.statusCode = 400;
        throw error;
    }

    const newProduct = new Product(productData);
    await newProduct.save();

    return { message: "Product created successfully" };
};

// Obtener todos los productos
export const getProductsService = async () => {
    const products = await Product.find();
    if (!products || products.length === 0) {
        const error = new Error("No products found");
        error.statusCode = 404;
        throw error;
    }
    return products;
};

// Obtener producto por id
export const getProductByIdService = async (productId) => {
    const product = await Product.findById(productId);
    if (!product) {
        const error = new Error("Product not found");
        error.statusCode = 404;
        throw error;
    }
    return product;
};

export const findProductByNameService = async (productName) => {
    if (!productName) {
        const error = new Error("Product name is required");
        error.statusCode = 400;
        throw error;
    }

    const products = await Product.find({
        name: { $regex: productName, $options: 'i' }
    });

    if (!products || products.length === 0) {
        const error = new Error(`No products found with name: ${productName}`);
        error.statusCode = 404;
        throw error;
    }

    return products;
};

export const getStatusService = async () => {
    const statusStats = await Product.aggregate([
        {
            $group: {
                _id: "$status",
                count: { $sum: 1 }
            }
        }
    ]);

    // Si no hay productos, devolver estructura vacía
    if (!statusStats || statusStats.length === 0) {
        return {
            total: 0,
            status: {}
        };
    }

    // Calcular total
    const total = statusStats.reduce((sum, stat) => sum + stat.count, 0);

    // Convertir a objeto más legible
    const statusObject = {};
    statusStats.forEach(stat => {
        statusObject[stat._id] = stat.count;
    });

    return {
        total,
        status: statusObject
    };
};

// Actualizar producto
export const updateProductService = async (productId, updateData) => {
    const product = await Product.findById(productId);
    if (!product) {
        const error = new Error("Product not found");
        error.statusCode = 404;
        throw error;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        updateData,
        { new: true }
    );

    return updatedProduct;
};

// Borrar producto
export const deleteProductService = async (productId) => {
    const product = await Product.findById(productId);
    if (!product) {
        const error = new Error("Product not found");
        error.statusCode = 404;
        throw error;
    }

    await Product.findByIdAndDelete(productId);
    return { message: "Product deleted successfully" };
};