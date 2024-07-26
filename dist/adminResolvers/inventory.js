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
const inventory_1 = require("../schema/inventory");
const graphql_1 = require("graphql");
const addNew = (_, { family }, { token }) => __awaiter(void 0, void 0, void 0, function* () {
    // if(token=='')
    //   throw new GraphQLError('Auth error');
    try {
        const newItem = new inventory_1.inventory({
            name: 'Not Edited',
            description: 'Item description',
            family: [family],
            enable: false,
            gallery: [],
            category: []
        });
        yield newItem.save();
        return newItem;
    }
    catch (error) {
        logger_1.default.error(error);
        throw new graphql_1.GraphQLError('Problem in making new item');
    }
});
const getItem = (_, { id }, { token }) => __awaiter(void 0, void 0, void 0, function* () {
    // if(token=='')
    //   throw new GraphQLError('Auth error');
    try {
        return yield inventory_1.inventory.findById(id);
    }
    catch (error) {
        logger_1.default.error(error);
        throw new graphql_1.GraphQLError('Problem in fetching item');
    }
});
const delItem = (_, { id }, { token }) => __awaiter(void 0, void 0, void 0, function* () {
    // if(token=='')
    //   throw new GraphQLError('Auth error');
    try {
        return yield inventory_1.inventory.findByIdAndRemove(id);
    }
    catch (error) {
        logger_1.default.error(error);
        throw new graphql_1.GraphQLError('Problem in fetching item');
    }
});
const getItems = (_, { family }, { token }) => __awaiter(void 0, void 0, void 0, function* () {
    // if(token=='')
    //   throw new GraphQLError('Auth error');
    try {
        return yield inventory_1.inventory.find({ family });
    }
    catch (error) {
        logger_1.default.error(error);
        throw new graphql_1.GraphQLError('Problem in fetching item');
    }
});
const editItem = (_, { obj }, { token }) => __awaiter(void 0, void 0, void 0, function* () {
    // if(token=='')
    //   throw new GraphQLError('Auth error');
    try {
        const newItem = yield inventory_1.inventory.findByIdAndUpdate(obj._id, obj, { new: true });
        return newItem;
    }
    catch (error) {
        logger_1.default.error(error);
        throw new graphql_1.GraphQLError('Problem in making new item');
    }
});
const liveToggle = (_, { id, status }, { token }) => __awaiter(void 0, void 0, void 0, function* () {
    // if(token=='')
    //   throw new GraphQLError('Auth error');
    try {
        const newItem = inventory_1.inventory.findByIdAndUpdate(id, { enable: status }, { new: true });
        return newItem;
    }
    catch (error) {
        logger_1.default.error(error);
        throw new graphql_1.GraphQLError('Problem in making new item');
    }
});
exports.default = {
    addNew,
    getItem,
    delItem,
    getItems,
    editItem,
    liveToggle,
};
