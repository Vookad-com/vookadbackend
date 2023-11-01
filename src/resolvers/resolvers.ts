import banner from "../adminResolvers/banner";
import auth from "./auth";
import customer from "./customer";
import inventory from "./inventory";
import ad_inventory from "../adminResolvers/inventory";

const resolvers = {
  Query: {
    verifyOtp : auth.verifyOtp,
    getInventoryItem : ad_inventory.getItem,
    banner: banner.carouselView,
    inventoryItems: inventory.getItems,
    getUser: customer.getUser
  },
  Mutation: {
    checkPhonenSend: auth.checkPhonenSend,
    saveAddress : customer.saveAddress,
  },
};

export default resolvers;
