import banner from "../adminResolvers/banner";
import auth from "./auth";
import customer from "./customer";
import inventory from "./inventory";
import ad_inventory from "../adminResolvers/inventory";
import feature from "./feature";
import checkout from "./checkout";
import chefs from "../adminResolvers/chefs";

const resolvers = {
  Query: {
    // verifyOtp : auth.verifyOtp,
    getInventoryItem : inventory.getItem,
    banner: banner.carouselView,
    inventoryItems: inventory.getItems,
    getUser: customer.getUser,
    nearby:feature.nearby,
    fetchOrders:customer.fetchOrders,
    getchef : chefs.getChef,
    getItem : ad_inventory.getItem,
  },
  Mutation: {
    // checkPhonenSend: auth.checkPhonenSend,
    createORCheck:auth.createORCheck,
    saveAddress : customer.saveAddress,
    delAddr:customer.delAddress,
    codcheckout:checkout.codcheckout,
    setFCM:customer.setFcm
  },
};

export default resolvers;
