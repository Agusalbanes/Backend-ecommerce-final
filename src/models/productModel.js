import mongoose from 'mongoose'

export const statusEnum = [ "AVAILABLE", "NOT AVAILABLE", "DISCONTINUED" ]

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [ true, "Name field is required" ],
        minLength: 3,
        maxLength: 50,
        unique: true,
        lowercase: true,
        trim: true
    },
    price: {
        type: Number,
        required: [ true, "Price field is required" ],
        min: [1, "Price field has to be a number"]
    },
    profitRate: {
        type: Number,
        default: 1.30,
        min: [1, "Profit rate must be greater than or equal to 1"]
    },
    description: {
        type: String,
        minLength: 5,
        maxLength: 200,
    },
    status: {
        type: String,
            validate: {
                validator: function (status) {
                    return statusEnum.includes(status)
                },
                message: props => `${props.value} it's not a valid status`
            }
    },
    category: {type: mongoose.Schema.Types.ObjectId, ref: "category" },

    stock: {
        type: Number,
        default: 0,
        min: [0, "Stock can't be a negative number"]
    },

    highlighted: {
        type: Boolean,
        default: false
    },
})

    // Metodos de instancia para disminuir el stock
    productSchema.methods.decreaseStock = async function (amount) {
        if(amount <= 0){
            throw new Error("Amount has to be a positive value")
        }

        if(this.stock < amount) {
            throw new Error("Not enough quantity")
        }
        this.stock -= amount
        // Se guarda en la db el nuevo valor
        await this.save()
    }

    productSchema.virtual("priceWithProfitRate").get(function () {
        return this.price * this.profitRate
    })

    productSchema.set("toJSON", {virtuals: true})
    productSchema.set("toObject", {virtuals: true})

export default mongoose.model("product", productSchema) 