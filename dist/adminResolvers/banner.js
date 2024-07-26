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
const graphql_1 = require("graphql");
const carousel_1 = require("../schema/carousel");
const carouselMod = (_, { id, payload }, { token }) => __awaiter(void 0, void 0, void 0, function* () {
    // if(token=='')
    //   throw new GraphQLError('Auth error');
    try {
        const newItem = yield carousel_1.carousel.findByIdAndUpdate(id, { gallery: payload }, { new: true });
        return newItem;
    }
    catch (error) {
        logger_1.default.error(error);
        throw new graphql_1.GraphQLError('Problem in Updating banner');
    }
});
const carouselView = (_, { id }, { token }) => __awaiter(void 0, void 0, void 0, function* () {
    // if(token=='')
    //   throw new GraphQLError('Auth error');
    try {
        const inst = yield carousel_1.carousel.findById(id);
        return inst;
    }
    catch (error) {
        logger_1.default.error(error);
        throw new graphql_1.GraphQLError('Error in fetching');
    }
});
exports.default = {
    carouselMod,
    carouselView
};
