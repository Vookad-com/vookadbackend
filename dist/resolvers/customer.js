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
const logger_1 = __importDefault(require("../logger"));
const order_1 = require("../schema/order");
const user_1 = require("../schema/user");
const graphql_1 = require("graphql");
const saveAddress = (_, { id, addPayload }, { token }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newAddress = {
            location: {
                type: "Point",
                coordinates: addPayload.coordinates,
            },
            building: addPayload.data.building,
            area: addPayload.data.area,
            landmark: addPayload.data.landmark,
            label: [addPayload.data.label],
            pincode: addPayload.data.pincode,
        };
        if (id != null) {
            yield user_1.users.updateOne({ fireId: token, 'addresses._id': id }, { $set: { 'addresses.$': newAddress } }, { new: true });
            return newAddress;
        }
        const user = yield user_1.users.findOne({ fireId: token });
        if (!user) {
            throw new graphql_1.GraphQLError("Unauthorized");
        }
        user.addresses.push(newAddress);
        yield user.save();
        return newAddress;
    }
    catch (error) {
        logger_1.default.error("Error: " + error);
        throw new graphql_1.GraphQLError('Error saving address');
    }
});
const delAddress = (_, { id }, { token }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.users.findByIdAndUpdate({ fireId: token }, // Change yourFireId to the actual value you're searching for
        { $pull: { addresses: { _id: id } } }, { new: true });
        if (!user) {
            throw new graphql_1.GraphQLError("Unauthorized");
        }
        return user;
    }
    catch (error) {
        logger_1.default.error("Error: " + error);
        throw new graphql_1.GraphQLError('Error deleting address');
    }
});
const getUser = (_, args, { token }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.users.findOne({ fireId: token });
        if (!user) {
            throw new graphql_1.GraphQLError("Unauthorized");
        }
        return user;
    }
    catch (error) {
        logger_1.default.error("Error: " + error);
        throw new graphql_1.GraphQLError('Error in getting user');
    }
});
const getUser_min = (_, args, { token }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.users.findOne({ fireId: token }).select('-addresses');
        if (!user) {
            throw new graphql_1.GraphQLError("Unauthorized");
        }
        return user;
    }
    catch (error) {
        logger_1.default.error("Error: " + error);
        throw new graphql_1.GraphQLError('Error in getting user');
    }
});
const setFcm = (_, fcmLoad, { token }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.users.updateOne({ fireId: token }, { $set: fcmLoad });
        return true;
    }
    catch (error) {
        logger_1.default.error("Error: " + error);
        throw new graphql_1.GraphQLError('Error in setting fcm token');
    }
});
const fetchOrders = (_, { page = 1, pageSize = 5 }, { token }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token) {
        token = "iE372XGtsuNe9uATB41x0X7dySi1";
    }
    try {
        const skip = (page - 1) * pageSize;
        const data = yield order_1.Order.find({ customerid: token }).sort({ createdAt: -1 }).skip(skip).limit(pageSize).exec();
        return data;
    }
    catch (error) {
        logger_1.default.error("Error: " + error);
        throw new graphql_1.GraphQLError('Error in getting orders');
    }
});
exports.default = {
    saveAddress,
    delAddress,
    getUser,
    setFcm,
    getUser_min,
    fetchOrders
};
