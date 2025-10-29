import {
    getCartByUser,
    addItemToCart,
    updateItemInCart,
    removeItemFromCart,
    clearCart
} from "../services/cartService.js"

export const getCart = async (req, res, next) => {
        const cart = await getCartByUser(req.user.id)
        res.status(200).json(cart)
    } 

export const addToCart = async (req, res, next) => {
        const { productId, quantity } = req.body
        const cart = await addItemToCart(req.user.id, productId, quantity)
        res.status(200).json(cart)
    } 
export const updateCartItem = async (req, res, next) => {
        const { productId, quantity } = req.body
        const cart = await updateItemInCart(req.user.id, productId, quantity)
        res.status(200).json(cart)
    } 

export const removeCartItem = async (req, res, next) => {
        const { productId } = req.body
        const cart = await removeItemFromCart(req.user.id, productId)
        res.status(200).json(cart)
    } 

export const clearUserCart = async (req, res, next) => {
        const cart = await clearCart(req.user.id)
        res.status(200).json(cart)
    } 
