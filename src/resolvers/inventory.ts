import logger from "../logger";
import { Chef, ChefInventory } from "../schema/chef";
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

const getItem = async (_:any, { id, chefId }:{id:string, chefId:string}, {token}: {token:string}, ) =>{
  // if(token=='')
  //   throw new GraphQLError('Auth error');

  try {
      const result= inventory.findOne({_id:id});
      const resbychef = ChefInventory.findOne({chefId, inventoryid:id});
      let [item,chefitem] = await Promise.all([result, resbychef]);
      if(chefitem==null){
        chefitem = {enable:item.enable, chefId};
      }
      return {
        enable: chefitem.enable,
        chefId:chefitem.chefId,
        info:item
      };
    } catch (error) {
      logger.error(error);
      throw new GraphQLError('Problem in fetching item');
    }
}



export default {
    getItems,
    getItem
}