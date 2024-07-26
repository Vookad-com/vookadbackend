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
const nearby = (_, { location }, { token }) => __awaiter(void 0, void 0, void 0, function* () {
    // if(token=='')
    //   throw new GraphQLError('Auth error');
    try {
        const menu = yield chef_1.Chef.aggregate([
            {
                $geoNear: {
                    near: {
                        type: "Point",
                        coordinates: location,
                    },
                    distanceField: "distance",
                    spherical: true,
                    maxDistance: 15000,
                },
            },
            {
                $lookup: {
                    from: "chef_inventories",
                    localField: "_id",
                    foreignField: "chefId",
                    as: "inventoryData",
                },
            },
            {
                $unwind: "$inventoryData", // Unwind the array created by $lookup
            },
            {
                $match: {
                    "inventoryData.enable": true, // Replace with true or false as needed
                },
            },
            {
                $lookup: {
                    from: "inventories",
                    localField: "inventoryData.inventoryid",
                    foreignField: "_id",
                    as: "info",
                },
            },
            {
                $match: {
                    "info.enable": true, // Replace with true or false as needed
                },
            }
        ]);
        return menu;
    }
    catch (error) {
        console.error(error);
        logger_1.default.error(error);
        throw new graphql_1.GraphQLError("failed to get nearby items");
    }
});
exports.default = {
    nearby,
};
