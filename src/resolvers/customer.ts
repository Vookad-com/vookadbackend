import logger from "../logger";
import { Order } from "../schema/order";
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
const getUser_min = async (_: any, args:any, { token }: { token: string }) => {
  try {
    const user = await users.findOne({ fireId: token }).select('-addresses');
    if (!user) {
      throw new GraphQLError("Unauthorized");
    }
    
    return user; 
  } catch (error) {
    logger.error("Error: " + error);
    throw new GraphQLError('Error in getting user');
  }
}
const setFcm = async (_: any, fcmLoad:{fcmToken:string}, { token }: { token: string }) => {
  try {
    const user = await users.updateOne({ fireId: token }, {$set:fcmLoad});
    
    return true; 
  } catch (error) {
    logger.error("Error: " + error);
    throw new GraphQLError('Error in setting fcm token');
  }
}

const fetchOrders = async(_:any, {page=1, pageSize=5}:{page:number, pageSize:number},  { token }: { token: string }) =>{
  if(!token){
    token="iE372XGtsuNe9uATB41x0X7dySi1";
  }
    
  try {
    const skip = (page - 1) * pageSize;
    const data = await Order.find({customerid:token}).sort({createdAt: -1}).skip(skip).limit(pageSize).exec();
    return data;
  } catch (error) {
    logger.error("Error: " + error);
    throw new GraphQLError('Error in getting orders');
  }
}

export default {
  saveAddress,
  delAddress,
  getUser,
  setFcm,
  getUser_min,
  fetchOrders
}
