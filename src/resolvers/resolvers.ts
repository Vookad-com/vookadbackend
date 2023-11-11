import banner from "../adminResolvers/banner";
import auth from "./auth";
import customer from "./customer";
import inventory from "./inventory";
import ad_inventory from "../adminResolvers/inventory";
import feature from "./feature";

const resolvers = {
  Query: {
    verifyOtp : auth.verifyOtp,
    getInventoryItem : ad_inventory.getItem,
    banner: banner.carouselView,
    inventoryItems: inventory.getItems,
    getUser: customer.getUser,
    nearby:feature.nearby,
  },
  Mutation: {
    checkPhonenSend: auth.checkPhonenSend,
    saveAddress : customer.saveAddress,
    delAddr:customer.delAddress,
  },
};

export default resolvers;
