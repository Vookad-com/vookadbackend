import { GraphQLError } from "graphql";
import logger from "../logger";
import { Order } from "../schema/order";
import customer from "./customer";
import { User } from "../types";
import { fireNotifier } from "../firebase";
interface OrderItem {
    chefid:string;
    pdtid:string;
    catid:string;
    quantity:number;
}

type Coordinates = [number, number];

type CompAddress = {
  building: string;
  area: string;
  landmark: string;
  label:string;
  pincode:string;
  location:{
    type:string;
    coordinates:Coordinates;
  }
};
interface checkoutLoad {
    items: OrderItem[];
    address: CompAddress;
    total : number;
    dod: Date;
}

const codcheckout = async (_: any, {items, address, total, dod}:checkoutLoad, { token }: { token: string }) => {
    try {
        if(items.length < 1)
            throw new GraphQLError("Empty Cart");
        const order = new Order({items, address, mode:'cod', status:'pending', customerid:token, total, dod});
        await order.save();
        notifyOrder(token, dod);
        return order;
    } catch (error) {
        logger.error(error);
        throw new Error('Error ordering');
    }
};

const notifyOrder = async (fireId:string, dod:Date)=>{
    const user:User = await customer.getUser_min("", "", { token : fireId });
    const message = {
        notification: {
            title: 'Ahoy!',
            body: `Your Order has been placed successfully`
        },
        token: user.fcmToken
      };
    fireNotifier.send(message)
      .catch((error) => {
        logger.error('Error sending message:', error);
      });  
}

export default {
    codcheckout
}