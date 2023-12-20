import logger from "../logger";
import { Order } from "../schema/order";
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
}

const codcheckout = async (_: any, {items, address, total}:checkoutLoad, { token }: { token: string }) => {
    try {
        const order = new Order({items, address, mode:'cod', status:'pending', customerid:token, total});
        await order.save();
        return order;
    } catch (error) {
        logger.error(error);
        throw new Error('Error ordering');
    }
};

export default {
    codcheckout
}