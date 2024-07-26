"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = exports.Product = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const user_1 = require("./user");
// Product Schema
const productSchema = new mongoose_1.Schema({
    chefid: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'chefs',
    },
    pdtid: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'inventories',
    },
    catid: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'inventories.category',
    },
    quantity: {
        type: Number,
        min: 0,
    },
});
exports.Product = mongoose_1.default.model('Product', productSchema);
// Order Schema
var PaymentMode;
(function (PaymentMode) {
    PaymentMode["COD"] = "cod";
    PaymentMode["OTHER"] = "other";
})(PaymentMode || (PaymentMode = {}));
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["PENDING"] = "pending";
    OrderStatus["PREPARED"] = "prepared";
    OrderStatus["ONTHEWAY"] = "ontheway";
    OrderStatus["DELIVERED"] = "delivered";
    OrderStatus["CANCELLED"] = "cancelled";
})(OrderStatus || (OrderStatus = {}));
const orderSchema = new mongoose_1.Schema({
    items: [productSchema],
    total: {
        type: Number,
        min: 0,
    },
    customerid: {
        type: String,
        required: true
    },
    address: user_1.addressSchema,
    mode: {
        type: String,
        enum: Object.values(PaymentMode),
    },
    status: {
        type: String,
        enum: Object.values(OrderStatus),
    },
    dod: {
        type: Date,
        required: true // You can make it required or not based on your needs
    },
}, {
    timestamps: true // Add createdAt and updatedAt fields
});
exports.Order = mongoose_1.default.model('Order', orderSchema);
