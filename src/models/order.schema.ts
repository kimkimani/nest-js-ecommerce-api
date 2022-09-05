import * as mongoose from 'mongoose';

export const orderSchema = new mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    totalPrice: {
        type: Number,
        required: true
    },
    products:[
        {
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                default:0
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }
});