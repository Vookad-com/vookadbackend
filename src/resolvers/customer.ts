import logger from "../logger";
import { Address, users } from "../schema/user";
import { GraphQLError } from 'graphql';

type Coordinates = [number, number];

type CompAddress = {
  building: string;
  area: string;
  landmark: string;
};

const saveAddress = async (_: any, args: { coordinates: Coordinates, data: CompAddress }, { token }: { token: string }) => {
  try {
    
    const user = await users.findById(token);
    if (!user) {
      throw new GraphQLError("Unauthorized");
    }

    
    const newAddress = new Address({
      location: {
        type: "Point",
        coordinates: args.coordinates,
      },
      building: args.data.building,
      area: args.data.area,
      landmark: args.data.landmark,
    });

    
    user.addresses.push(newAddress);

    
    await user.save();

    return newAddress; 
  } catch (error) {
    logger.error("Error: " + error);
    throw new GraphQLError('Error saving address');
  }
}

export default {
  saveAddress,
}
