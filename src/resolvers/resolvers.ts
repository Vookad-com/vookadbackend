import banner from "../adminResolvers/banner";
import auth from "./auth";
import customer from "./customer";
import inventory from "./inventory";

const resolvers = {
  Query: {
    verifyOtp : auth.verifyOtp,
    getAddresses : customer.getAddresses,
    banner: banner.carouselView,
    inventoryItems: inventory.getItems,
  },
  Mutation: {
    checkPhonenSend: auth.checkPhonenSend,
  },
};

export default resolvers;
