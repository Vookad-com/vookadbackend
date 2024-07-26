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
const chef_1 = require("../schema/chef");
const newChef = (_, { chef }, { token }) => __awaiter(void 0, void 0, void 0, function* () {
    // if(token=='')
    //   throw new GraphQLError('Auth error');
    try {
        const newUser = new chef_1.Chef(Object.assign(Object.assign({}, chef), { location: {
                type: "Point",
                coordinates: chef.location,
            } })), user = yield newUser.save();
        return user;
    }
    catch (error) {
        logger_1.default.error(error);
        throw new graphql_1.GraphQLError("failed to make new chef");
    }
});
const editChef = (_, { chef, id }, { token }) => __awaiter(void 0, void 0, void 0, function* () {
    // if(token=='')
    //   throw new GraphQLError('Auth error');
    try {
        const user = yield chef_1.Chef.findByIdAndUpdate(id, Object.assign(Object.assign({}, chef), { location: {
                type: "Point",
                coordinates: chef.location,
            } }), { new: true });
        return user;
    }
    catch (error) {
        logger_1.default.error(error);
        throw new graphql_1.GraphQLError("failed to make edit on chef");
    }
});
const getChef = (_, { id }, { token }) => __awaiter(void 0, void 0, void 0, function* () {
    // if(token=='')
    //   throw new GraphQLError('Auth error');
    try {
        const user = yield chef_1.Chef.findById(id).select('-inventory');
        return user;
    }
    catch (error) {
        logger_1.default.error(error);
        throw new graphql_1.GraphQLError("failed to find chef");
    }
});
const getChefs = (_, args, { token }) => __awaiter(void 0, void 0, void 0, function* () {
    // if(token=='')
    //   throw new GraphQLError('Auth error');
    try {
        const chefs = yield chef_1.Chef.find({}).select('-inventory');
        return chefs;
    }
    catch (error) {
        logger_1.default.error(error);
        throw new graphql_1.GraphQLError("failed to find chef");
    }
});
const getMenu = (_, { id: chefId }, { token }) => __awaiter(void 0, void 0, void 0, function* () {
    // if(token=='')
    //   throw new GraphQLError('Auth error');
    try {
        const menu = yield chef_1.ChefInventory.find({ chefId });
        return menu;
    }
    catch (error) {
        logger_1.default.error(error);
        throw new graphql_1.GraphQLError("failed to find chef");
    }
});
const editMenu = (_, { chefId, inventoryid, enable }, { token }) => __awaiter(void 0, void 0, void 0, function* () {
    // if(token=='')
    //   throw new GraphQLError('Auth error');
    try {
        let item = yield chef_1.ChefInventory.findOne({ chefId, inventoryid });
        if (item) {
            item.enable = enable;
        }
        else {
            const newitem = {
                inventoryid,
                chefId,
                enable
            };
            item = (0, chef_1.ChefInventory)(newitem);
        }
        yield item.save();
        return item;
    }
    catch (error) {
        console.error(error);
        logger_1.default.error(error);
        throw new graphql_1.GraphQLError("failed to edit menu item");
    }
});
exports.default = {
    newChef,
    getChef,
    editChef,
    getMenu,
    getChefs,
    editMenu,
};
