import mongoose, { Schema, Document, Date } from 'mongoose';
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
    PREPARED = 'prepared',
    ONTHEWAY = 'ontheway',
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
    dod: Date;
}

const orderSchema = new Schema({
    items: [productSchema],
    total: {
        type: Number,
        min: 0,
    },
    customerid: {
        type: String,
        required: true
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
    dod:{ //date of delivery
        type: Date,
        required: true // You can make it required or not based on your needs
      },
}, {
    timestamps: true // Add createdAt and updatedAt fields
  });

export const Order = mongoose.model<Order>('Order', orderSchema);
