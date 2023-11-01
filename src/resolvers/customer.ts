import logger from "../logger";
import { users } from "../schema/user";
import { GraphQLError } from 'graphql';

type Coordinates = [number, number];

type CompAddress = {
  building: string;
  area: string;
  landmark: string;
  label:string;
};

const saveAddress = async (_: any, {addPayload}: { addPayload : {coordinates: Coordinates, data: CompAddress} }, { token }: { token: string }) => {
  try {
    
    const user = await users.findById(token);
    if (!user) {
      throw new GraphQLError("Unauthorized");
    }

    
    const newAddress = {
      location: {
        type: "Point",
        coordinates: addPayload.coordinates,
      },
      building: addPayload.data.building,
      area: addPayload.data.area,
      landmark: addPayload.data.landmark,
      label:[addPayload.data.label],
    };

    user.addresses.push(newAddress);

    await user.save();

    return newAddress; 
  } catch (error) {
    logger.error("Error: " + error);
    throw new GraphQLError('Error saving address');
  }
}
const getUser = async (_: any, args:any, { token }: { token: string }) => {
  try {
    const user = await users.findById(token);
    if (!user) {
      throw new GraphQLError("Unauthorized");
    }
    
    return user; 
  } catch (error) {
    logger.error("Error: " + error);
    throw new GraphQLError('Error in getting user');
  }
}

export default {
  saveAddress,
  getUser
}
