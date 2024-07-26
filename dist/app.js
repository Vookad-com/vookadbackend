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
const server_1 = require("@apollo/server");
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const fs_1 = require("fs");
const express4_1 = require("@apollo/server/express4");
const cors = require('cors');
const body_parser_1 = require("body-parser");
const express_1 = __importDefault(require("express"));
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const resolvers_1 = __importDefault(require("./resolvers/resolvers"));
const resolvers_2 = __importDefault(require("./adminResolvers/resolvers"));
const mongoose_1 = __importDefault(require("mongoose"));
const firebase_1 = require("./firebase");
require('dotenv').config();
// https://console.twilio.com/?frameUrl=%2Fconsole%3Fx-target-region%3Dus1
const jwt_secret = process.env.JWT_SECRET;
const jwt_admin = process.env.JWT_ADMIN;
const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
    console.error('Database URL is not defined in the environment variables.');
    process.exit(1); // Exit the application or handle the error accordingly
}
mongoose_1.default.connect(dbUrl);
const typeDefs = (0, graphql_tag_1.default)((0, fs_1.readFileSync)("schema.graphql", {
    encoding: "utf-8",
}));
const AdmintypeDefs = (0, graphql_tag_1.default)((0, fs_1.readFileSync)("admin.graphql", {
    encoding: "utf-8",
}));
const server = new server_1.ApolloServer({
    typeDefs, resolvers: resolvers_1.default
});
const Adminserver = new server_1.ApolloServer({
    typeDefs: AdmintypeDefs,
    resolvers: resolvers_2.default
});
const app = (0, express_1.default)();
app.use(cookieParser());
server.start().then(() => {
    app.use('/graphql', cors(), (0, body_parser_1.json)(), (0, express4_1.expressMiddleware)(server, {
        context: ({ req, res }) => __awaiter(void 0, void 0, void 0, function* () {
            const token = req.headers.authorization || '';
            if (token == '')
                return { token: null, usertoken: null };
            try {
                const decodedToken = yield firebase_1.fireAuth.verifyIdToken(token);
                return { token: decodedToken.uid, usertoken: token };
            }
            catch (error) {
                console.error(error);
                return { token: null, usertoken: token };
            }
        })
    }));
});
Adminserver.start().then(() => {
    app.use('/admin', cors(), (0, body_parser_1.json)(), (0, express4_1.expressMiddleware)(Adminserver, {
        context: ({ req, res }) => __awaiter(void 0, void 0, void 0, function* () {
            const token = req.headers.authorization || '';
            try {
                const decodedToken = jwt.verify(token, jwt_admin);
                return { token: decodedToken };
            }
            catch (error) {
                return { token: '' };
            }
        })
    }));
});
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Application is healthy' });
});
exports.default = app;
