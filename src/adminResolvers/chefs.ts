import { GraphQLError } from "graphql";
import logger from "../logger";
import { Chef, ChefInventory } from "../schema/chef";

interface ChefInput {
    name: string;
    displayname?: string | null;
    phone?: string | null;
    location?: [number] | null;
    address?: AddressInput | null;
    pincode?: string | null;
  }
interface MenuInput {
    chefId: string;
    inventoryid: string;
    enable:boolean;
  }

  // Define the AddressInput type
  interface AddressInput {
    building: string;
    area: string;
    landmark: string;
  }

const newChef = async (_:any, { chef }:{chef:ChefInput},  {token}: {token:string},) =>{
    // if(token=='')
    //   throw new GraphQLError('Auth error');
    try {
        const newUser = new Chef({...chef,location: {
            type: "Point",
            coordinates: chef.location,
          }}),
        user = await newUser.save();
        return user;
        }
     catch (error) {
        logger.error(error);
        throw new GraphQLError("failed to make new chef");
      }
}
const editChef = async (_:any, { chef, id }:{chef:ChefInput, id:string},  {token}: {token:string},) =>{
    // if(token=='')
    //   throw new GraphQLError('Auth error');
    try {
        const user = await Chef.findByIdAndUpdate(id, {...chef,location: {
            type: "Point",
            coordinates: chef.location,
          }}, { new: true });
        return user;
        }
     catch (error) {
        logger.error(error);
        throw new GraphQLError("failed to make edit on chef");
      }
}

const getChef = async (_:any, { id }:{id:string},  {token}: {token:string},) =>{
    // if(token=='')
    //   throw new GraphQLError('Auth error');
    try {
        const user = await Chef.findById(id).select('-inventory');
        return user;
        }
     catch (error) {
        logger.error(error);
        throw new GraphQLError("failed to find chef");
      }
}
const getChefs = async (_:any, args:any,  {token}: {token:string},) =>{
    // if(token=='')
    //   throw new GraphQLError('Auth error');
    try {
        const chefs = await Chef.find({}).select('-inventory');
        return chefs;
        }
     catch (error) {
        logger.error(error);
        throw new GraphQLError("failed to find chef");
      }
}
const getMenu = async (_:any, { id:chefId }:{id:string},  {token}: {token:string},) =>{
    // if(token=='')
    //   throw new GraphQLError('Auth error');
    try {
        const menu= await ChefInventory.find({chefId});
        return menu;
        }
     catch (error) {
        logger.error(error);
        throw new GraphQLError("failed to find chef");
      }
}
const editMenu = async (_:any, { chefId, inventoryid, enable }:MenuInput,  {token}: {token:string},) =>{
    // if(token=='')
    //   throw new GraphQLError('Auth error');
    try {
        let item = await ChefInventory.findOne({chefId, inventoryid} );
        if(item){
          item.enable = enable;
        } else {
          const newitem = {
            inventoryid,
            chefId,
            enable
          };
          item = ChefInventory(newitem);
        }
        await item.save();
        return item;
        }
     catch (error) {
        console.error(error);
        logger.error(error);
        throw new GraphQLError("failed to edit menu item");
      }
}
export default {
    newChef,
    getChef,
    editChef,
    getMenu,
    getChefs,
    editMenu,
 };