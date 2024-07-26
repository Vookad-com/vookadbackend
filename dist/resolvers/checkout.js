"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const logger_1 = __importDefault(require("../logger"));
const order_1 = require("../schema/order");
const customer_1 = __importDefault(require("./customer"));
const firebase_1 = require("../firebase");
const codcheckout = (_, { items, address, total, dod }, { token }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (items.length < 1)
            throw new graphql_1.GraphQLError("Empty Cart");
        const order = new order_1.Order({ items, address, mode: 'cod', status: 'pending', customerid: token, total, dod });
        yield order.save();
        notifyOrder(token, dod);
        return order;
    }
    catch (error) {
        logger_1.default.error(error);
        throw new Error('Error ordering');
    }
});
const notifyOrder = (fireId, dod) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield customer_1.default.getUser_min("", "", { token: fireId });
    const message = {
        notification: {
            title: 'Ahoy!',
            body: `Your Order has been placed successfully`
        },
        token: user.fcmToken
    };
    firebase_1.fireNotifier.send(message)
        .catch((error) => {
        logger_1.default.error('Error sending message:', error);
    });
});
exports.default = {
    codcheckout
};
