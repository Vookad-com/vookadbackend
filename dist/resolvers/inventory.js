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
const chef_1 = require("../schema/chef");
const inventory_1 = require("../schema/inventory");
const graphql_1 = require("graphql");
const getItems = (_, { family }, { token }) => __awaiter(void 0, void 0, void 0, function* () {
    // if(token=='')
    //   throw new GraphQLError('Auth error');
    try {
        return yield inventory_1.inventory.find({ family, enable: true });
    }
    catch (error) {
        logger_1.default.error(error);
        throw new graphql_1.GraphQLError('Problem in fetching item');
    }
});
const getItem = (_, { id, chefId }, { token }) => __awaiter(void 0, void 0, void 0, function* () {
    // if(token=='')
    //   throw new GraphQLError('Auth error');
    try {
        const result = inventory_1.inventory.findOne({ _id: id });
        const resbychef = chef_1.ChefInventory.findOne({ chefId, inventoryid: id });
        let [item, chefitem] = yield Promise.all([result, resbychef]);
        if (chefitem == null) {
            chefitem = { enable: item.enable, chefId };
        }
        return {
            enable: chefitem.enable,
            chefId: chefitem.chefId,
            info: item
        };
    }
    catch (error) {
        logger_1.default.error(error);
        throw new graphql_1.GraphQLError('Problem in fetching item');
    }
});
exports.default = {
    getItems,
    getItem
};
