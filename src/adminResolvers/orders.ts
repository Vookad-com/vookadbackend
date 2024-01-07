import { GraphQLError } from "graphql";
import logger from "../logger";
import { Order } from "../schema/order";
import customer from "../resolvers/customer";
import { User } from "../types";
import { fireNotifier } from "../firebase";
import { ObjectId } from "mongoose";

const getOrdersByDate = async (_:any, { dateISO }:{dateISO:string}, {token}: {token:string}, ) =>{
    // if(token=='')
    //   throw new GraphQLError('Auth error');
    

    try {
        const date = new Date(dateISO);
        date.setHours(0, 0, 0, 0);
        return await Order.aggregate([
            {
              $match: {
                createdAt: {
                    $gte: date, // Documents created on or after the provided date
                    $lt: new Date(date.getTime() + 24 * 60 * 60 * 1000), // Documents created before the next day
                  },
              },
            },
            {
              $lookup: {
                from: "users",
                localField: "customerid",
                foreignField: "fireId",
                as: "userInfo",
              },
            },
          ]);
      } catch (error) {
        logger.error(error);
        throw new GraphQLError('Problem in fetching orders');
      }
}
const getOrdersByChef = async (_:any, { chefId, status}:{chefId:string, status: string}, {token}: {token:string}, ) =>{
    // if(token=='')
    //   throw new GraphQLError('Auth error');
    

    try {
        // const date = new Date("2024-01-01T00:00:00Z");
        const date = new Date();
        date.setHours(0,0,0);
        return await Order.find({
          "items.chefid": chefId,
              dod: {
                $gte: date, // Documents created on or after the provided date
                $lt: new Date(date.getTime() + 24 * 60 * 60 * 1000),
          },
          status,
        });
      } catch (error) {
        logger.error(error);
        throw new GraphQLError('Problem in fetching orders');
      }
}

const setToPickup = async (_:any, { orderid }:{ orderid:string }, {token}: {token:string}, ) =>{
  // if(token=='')
  //   throw new GraphQLError('Auth error');
  

  try {
      let order = await Order.findByIdAndUpdate(orderid, {status:"prepared"},  { new: true });
      if(order?.customerid)
        notifyPrepared(order?.customerid.toString());
      return true;
    } catch (error) {
      logger.error(error);
      throw new GraphQLError('Problem in fetching orders');
    }
}

const notifyPrepared = async (fireId:string)=>{
  const user:User = await customer.getUser_min("", "", { token : fireId });
  const message = {
      notification: {
          title: 'Ahoy!',
          body: `Your Order has been prepared and is ready for pickup`
      },
      token: user.fcmToken
    };
  fireNotifier.send(message)
    .catch((error) => {
      logger.error('Error sending message:', error);
    });  
}



export default {
    getOrdersByDate,
    getOrdersByChef,
    setToPickup
}