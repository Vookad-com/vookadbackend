"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const banner_1 = __importDefault(require("../adminResolvers/banner"));
const auth_1 = __importDefault(require("./auth"));
const customer_1 = __importDefault(require("./customer"));
const inventory_1 = __importDefault(require("./inventory"));
const inventory_2 = __importDefault(require("../adminResolvers/inventory"));
const feature_1 = __importDefault(require("./feature"));
const checkout_1 = __importDefault(require("./checkout"));
const chefs_1 = __importDefault(require("../adminResolvers/chefs"));
const resolvers = {
    Query: {
        // verifyOtp : auth.verifyOtp,
        getInventoryItem: inventory_1.default.getItem,
        banner: banner_1.default.carouselView,
        inventoryItems: inventory_1.default.getItems,
        getUser: customer_1.default.getUser,
        nearby: feature_1.default.nearby,
        fetchOrders: customer_1.default.fetchOrders,
        getchef: chefs_1.default.getChef,
        getItem: inventory_2.default.getItem,
    },
    Mutation: {
        // checkPhonenSend: auth.checkPhonenSend,
        createORCheck: auth_1.default.createORCheck,
        saveAddress: customer_1.default.saveAddress,
        delAddr: customer_1.default.delAddress,
        codcheckout: checkout_1.default.codcheckout,
        setFCM: customer_1.default.setFcm
    },
};
exports.default = resolvers;
