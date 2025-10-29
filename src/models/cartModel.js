import mongoose from "mongoose"

const cartItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true },
    quantity: { type: Number, default: 1, min: 1 }
})

const cartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true, unique: true },
    items: [cartItemSchema],
    status: {
        type: String,
        enum: ["active", "completed"],
        default: "active"
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true},
    toObject: { virtuals: true}
})

//calcula el total automáticamente

cartSchema.virtual("totalPrice").get(function () {
    if (!this.items) return 0
    return this.items.reduce((total, item) => {
        const price = item.product?.priceWithProfitRate || 0
        return total + price * item.quantity
    
}, 0)
})
//Método para agregar o actualizar cantidad de un producto
cartSchema.methods.addItem = async function (productId, quantity = 1) {
    const itemIndex = this.items.findIndex(i => i.product.toString() === productId.toString())
    if (itemIndex > -1){
        this.items[itemIndex].quantity += quantity
    } else {
        this.items.push({ product: productId, quantity})
    }
    await this.save()
    return this
}

export default mongoose.model("cart", cartSchema)
