import logger from "../logger";
import { inventory } from "../schema/inventory";
import { GraphQLError } from 'graphql';

type Category = {
  price?: number;
  name?: string;
};

type InventoryItem = {
  _id: string;
  name: string;
  description?: string | null;
  enable?: boolean | null;
  gallery?: string[] | null;
  category?: Category[] | null;
};

const getItems = async (_:any, { family}:{family:string}, {token}: {token:string}, ) =>{
    // if(token=='')
    //   throw new GraphQLError('Auth error');

    try {
        return await inventory.find({family, enable:true});
      } catch (error) {
        logger.error(error);
        throw new GraphQLError('Problem in fetching item');
      }
}



export default {
    getItems,
}