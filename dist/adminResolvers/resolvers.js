"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("./auth"));
const banner_1 = __importDefault(require("./banner"));
const chefs_1 = __importDefault(require("./chefs"));
const inventory_1 = __importDefault(require("./inventory"));
const orders_1 = __importDefault(require("./orders"));
const resolvers = {
    Query: {
        verifyOtp: auth_1.default.verifyOtp,
        getInventoryItem: inventory_1.default.getItem,
        inventoryItems: inventory_1.default.getItems,
        banner: banner_1.default.carouselView,
        getchef: chefs_1.default.getChef,
        getchefs: chefs_1.default.getChefs,
        getMenu: chefs_1.default.getMenu,
        getOrdersbyDate: orders_1.default.getOrdersByDate,
        getOrdersByChef: orders_1.default.getOrdersByChef,
    },
    Mutation: {
        checkPhonenSend: auth_1.default.checkPhonenSend,
        deleteinventoryItem: inventory_1.default.delItem,
        inventoryAdd: inventory_1.default.addNew,
        inventoryItem: inventory_1.default.editItem,
        liveToggle: inventory_1.default.liveToggle,
        carousel: banner_1.default.carouselMod,
        newchef: chefs_1.default.newChef,
        editchef: chefs_1.default.editChef,
        editMenu: chefs_1.default.editMenu,
        setToPickup: orders_1.default.setToPickup,
    },
};
exports.default = resolvers;
