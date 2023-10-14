import logger from "../logger";
import { users } from "../schema/user";
import { GraphQLError } from 'graphql';

const getAddresses = async (_:any, args:{}| null, {token}: {token:string} ) =>{
    try {
        let user = await users.findById(token);
        if (!user) 
            throw new GraphQLError("unauthorised");
        return user;
      } catch (error) {
        logger.error("error");
        throw new GraphQLError('Error checking address');
      }
}

export default {
    getAddresses,
}