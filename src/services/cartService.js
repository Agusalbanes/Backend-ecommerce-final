import Cart from "../models/cartModel.js"

export const getCartByUser = async (userId) => {
    let cart = await Cart.findOne({ user: userId }).populate("items.product")
    if (!cart) {
        cart = new Cart({ user: userId, items: [] })
        await cart.save()
    }
    return cart
}

// Agregar producto al carrito
export const addItemToCart = async (userId, productId, quantity = 1) => {
    const cart = await getCartByUser(userId)

    const existingItem = cart.items.find(item => item.product.toString() === productId)
    if (existingItem) {
        existingItem.quantity += quantity
    } else {
        cart.items.push({ product: productId, quantity })
    }

    await cart.save()
    return await cart.populate("items.product")
}

// Actualizar cantidad de un producto en el carrito
export const updateItemInCart = async (userId, productId, quantity) => {
    const cart = await getCartByUser(userId)
    const item = cart.items.find(item => item.product.toString() === productId)

    if (!item) {
        const error = new Error("Producto no encontrado en el carrito")
        error.statusCode = 404
        throw error
    }

    if (quantity <= 0) {
        cart.items = cart.items.filter(i => i.product.toString() !== productId)
    } else {
        item.quantity = quantity
    }

    await cart.save()
    return await cart.populate("items.product")
}

// Eliminar producto del carrito
export const removeItemFromCart = async (userId, productId) => {
    const cart = await getCartByUser(userId)
    const exists = cart.items.some(item => item.product.toString() === productId)

    if (!exists) {
        const error = new Error("Producto no encontrado en el carrito")
        error.statusCode = 404
        throw error
    }

    cart.items = cart.items.filter(item => item.product.toString() !== productId)
    await cart.save()
    return await cart.populate("items.product")
}

// Vaciar carrito
export const clearCart = async (userId) => {
    const cart = await getCartByUser(userId)
    cart.items = []
    await cart.save()
    return await cart.populate("items.product")
}
