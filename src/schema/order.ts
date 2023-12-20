import mongoose, { Schema, Document } from 'mongoose';
import { addressSchema } from './user';

// Product Schema
const productSchema = new Schema({
    chefid: {
        type: Schema.Types.ObjectId,
        ref: 'chefs',
    },
    pdtid: {
        type: Schema.Types.ObjectId,
        ref: 'inventories',
    },
    catid: {
        type: Schema.Types.ObjectId,
        ref: 'inventories.category',
    },
    quantity: {
        type: Number,
        min: 0,
    },
});

export const Product = mongoose.model('Product', productSchema);

// Order Schema
enum PaymentMode {
    COD = 'cod',
    OTHER = 'other',
}

enum OrderStatus {
    PENDING = 'pending',
    CONFIRMED = 'confirmed',
    DELIVERED = 'delivered',
    CANCELLED = 'cancelled',
}

interface OrderItem {
    chefid:string;
    pdtid:string;
    catid:string;
    quantity:number;
}

interface Order extends Document {
    items: OrderItem[];
    customerid: mongoose.Types.ObjectId;
    mode: PaymentMode;
    status: OrderStatus;
}

const orderSchema = new Schema({
    items: [productSchema],
    total: {
        type: Number,
        min: 0,
    },
    customerid: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    address: addressSchema,
    mode: {
        type: String,
        enum: Object.values(PaymentMode),
    },
    status: {
        type: String,
        enum: Object.values(OrderStatus),
    },
});

export const Order = mongoose.model<Order>('Order', orderSchema);
