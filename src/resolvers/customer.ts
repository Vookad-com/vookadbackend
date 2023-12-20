import logger from "../logger";
import { users } from "../schema/user";
import { GraphQLError } from 'graphql';

type Coordinates = [number, number];

type CompAddress = {
  building: string;
  area: string;
  landmark: string;
  label:string;
  pincode:string;
};

const saveAddress = async (_: any, {id,addPayload}: { id:string|null;addPayload : {coordinates: Coordinates, data: CompAddress} }, { token }: { token: string }) => {
  try {
    const newAddress = {
      location: {
        type: "Point",
        coordinates: addPayload.coordinates,
      },
      building: addPayload.data.building,
      area: addPayload.data.area,
      landmark: addPayload.data.landmark,
      label:[addPayload.data.label],
      pincode:addPayload.data.pincode,
    };


    if(id != null){
      await users.updateOne(
        { fireId: token, 'addresses._id': id },
        { $set: { 'addresses.$': newAddress } },
        { new: true }
      )
      return newAddress; 
    }
    
    const user = await users.findOne({ fireId: token });
    if (!user) {
      throw new GraphQLError("Unauthorized");
    }

    

    user.addresses.push(newAddress);

    await user.save();

    return newAddress; 
  } catch (error) {
    logger.error("Error: " + error);
    throw new GraphQLError('Error saving address');
  }
}
const delAddress = async (_: any, {id}: { id :string }, { token }: { token: string }) => {
  try {
    
    const user = await users.findByIdAndUpdate(
      { fireId: token }, // Change yourFireId to the actual value you're searching for
      { $pull: { addresses: { _id: id } } },
      { new: true }
    );
    if (!user) {
      throw new GraphQLError("Unauthorized");
    }

    return user;
  } catch (error) {
    logger.error("Error: " + error);
    throw new GraphQLError('Error deleting address');
  }
}
const getUser = async (_: any, args:any, { token }: { token: string }) => {
  try {
    const user = await users.findOne({ fireId: token });
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
  delAddress,
  getUser
}
