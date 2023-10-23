import auth from "./auth";
import banner from "./banner";
import inventory from "./inventory";
const resolvers = {
  Query: {
    verifyOtp : auth.verifyOtp,
    getInventoryItem: inventory.getItem,
    inventoryItems:inventory.getItems,
    banner: banner.carouselView
  },
  Mutation: {
    checkPhonenSend: auth.checkPhonenSend,
    deleteinventoryItem: inventory.delItem,
    inventoryAdd: inventory.addNew,
    inventoryItem: inventory.editItem,
    liveToggle: inventory.liveToggle,
    carousel: banner.carouselMod,
  },
};

export default resolvers;
