import { GraphQLError } from "graphql";
import logger from "../logger";
import { Chef } from "../schema/chef";

const nearby = async (_:any, { location }:{location: number[];},  {token}: {token:string},) =>{
    // if(token=='')
    //   throw new GraphQLError('Auth error');
    try {
        const menu = await Chef.aggregate([
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
        logger.error(error);
        throw new GraphQLError("failed to get nearby items");
      }
  }

export default {
    nearby,
}  