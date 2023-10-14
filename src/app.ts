import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import gql from "graphql-tag";
import { readFileSync } from "fs";
import { expressMiddleware } from '@apollo/server/express4';
const cors = require('cors');
import { json } from 'body-parser';
import express from 'express';

const jwt = require('jsonwebtoken');

import resolvers from './resolvers/resolvers';

import mongoose from 'mongoose';

require('dotenv').config();

// https://console.twilio.com/?frameUrl=%2Fconsole%3Fx-target-region%3Dus1
const jwt_secret = process.env.JWT_SECRET;
const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  console.error('Database URL is not defined in the environment variables.');
  process.exit(1); // Exit the application or handle the error accordingly
}

mongoose.connect(dbUrl);

interface AuthContext{
  token?: string;
}

const typeDefs = gql(
  readFileSync("schema.graphql", {
    encoding: "utf-8",
  })
  );

const server = new ApolloServer<AuthContext>({
  typeDefs, resolvers
});

const app = express();

server.start().then(() => {
  app.use('/graphql', cors(), json(), expressMiddleware(server, {
    context : async ({req,res}):Promise<{ token: string }> => {
      const token = req.headers.authorization || '';
      try {
        const decodedToken = jwt.verify(token, jwt_secret);
        return {token:decodedToken};
      } catch (error) {
        return {token: ''};
      }
    }
  }));
});

export default app;
