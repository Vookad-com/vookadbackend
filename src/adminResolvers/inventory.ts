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

type InventoryItemInput = {
  _id: string;
  name: string;
  description?: string | null;
  enable?: boolean | null;
  gallery?: string[] | null;
  family?: string[] | null;
  category?: CategoryInput[] | null;
};

type CategoryInput = {
  price?: number;
  name?: string;
};

const addNew = async (_:any, { family }:{family:string} , {token}: {token:string}, ) =>{
    // if(token=='')
    //   throw new GraphQLError('Auth error');

    try {
        const newItem = new inventory({
            name: 'Not Edited',
            description: 'Item description',
            family:[family],
            enable: false,
            gallery: [],
            category: []
          });
          await newItem.save();
        return newItem;
      } catch (error) {
        logger.error(error);
        throw new GraphQLError('Problem in making new item');
      }
}
const getItem = async (_:any, { id }:{id:string}, {token}: {token:string}, ) =>{
    // if(token=='')
    //   throw new GraphQLError('Auth error');

    try {
        return await inventory.findById(id);
      } catch (error) {
        logger.error("error");
        throw new GraphQLError('Problem in fetching item');
      }
}
const delItem = async (_:any, { id }:{id:string}, {token}: {token:string}, ) =>{
    // if(token=='')
    //   throw new GraphQLError('Auth error');

    try {
        return await inventory.findByIdAndRemove(id);
      } catch (error) {
        logger.error("error");
        throw new GraphQLError('Problem in fetching item');
      }
}
const getItems = async (_:any, { family}:{family:string}, {token}: {token:string}, ) =>{
    // if(token=='')
    //   throw new GraphQLError('Auth error');

    try {
        return await inventory.find({family});
      } catch (error) {
        logger.error("error");
        throw new GraphQLError('Problem in fetching item');
      }
}
const editItem = async (_:any, { obj }:{obj:InventoryItemInput}, {token}: {token:string}, ) =>{
    // if(token=='')
    //   throw new GraphQLError('Auth error');

    try {
        const newItem = inventory.findByIdAndUpdate(obj._id ,obj, { new: true });
        return newItem;
      } catch (error) {
        logger.error("error");
        throw new GraphQLError('Problem in making new item');
      }
}

export default {
    addNew,
    getItem,
    delItem,
    getItems,
    editItem,
}