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
const customer_1 = __importDefault(require("../resolvers/customer"));
const firebase_1 = require("../firebase");
const getOrdersByDate = (_, { dateISO }, { token }) => __awaiter(void 0, void 0, void 0, function* () {
    // if(token=='')
    //   throw new GraphQLError('Auth error');
    try {
        const date = new Date(dateISO);
        date.setHours(0, 0, 0, 0);
        return yield order_1.Order.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: date,
                        $lt: new Date(date.getTime() + 24 * 60 * 60 * 1000), // Documents created before the next day
                    },
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "customerid",
                    foreignField: "fireId",
                    as: "userInfo",
                },
            },
        ]);
    }
    catch (error) {
        logger_1.default.error(error);
        throw new graphql_1.GraphQLError('Problem in fetching orders');
    }
});
const getOrdersByChef = (_, { chefId, status }, { token }) => __awaiter(void 0, void 0, void 0, function* () {
    // if(token=='')
    //   throw new GraphQLError('Auth error');
    try {
        // const date = new Date("2024-01-01T00:00:00Z");
        const date = new Date();
        date.setHours(0, 0, 0);
        return yield order_1.Order.find({
            "items.chefid": chefId,
            dod: {
                $gte: date,
                $lt: new Date(date.getTime() + 24 * 60 * 60 * 1000),
            },
            status,
        });
    }
    catch (error) {
        logger_1.default.error(error);
        throw new graphql_1.GraphQLError('Problem in fetching orders');
    }
});
const setToPickup = (_, { orderid }, { token }) => __awaiter(void 0, void 0, void 0, function* () {
    // if(token=='')
    //   throw new GraphQLError('Auth error');
    try {
        let order = yield order_1.Order.findByIdAndUpdate(orderid, { status: "prepared" }, { new: true });
        if (order === null || order === void 0 ? void 0 : order.customerid)
            notifyPrepared(order === null || order === void 0 ? void 0 : order.customerid.toString());
        return true;
    }
    catch (error) {
        logger_1.default.error(error);
        throw new graphql_1.GraphQLError('Problem in fetching orders');
    }
});
const notifyPrepared = (fireId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield customer_1.default.getUser_min("", "", { token: fireId });
    const message = {
        notification: {
            title: 'Ahoy!',
            body: `Your Order has been prepared and is ready for pickup`
        },
        token: user.fcmToken
    };
    firebase_1.fireNotifier.send(message)
        .catch((error) => {
        logger_1.default.error('Error sending message:', error);
    });
});
exports.default = {
    getOrdersByDate,
    getOrdersByChef,
    setToPickup
};
