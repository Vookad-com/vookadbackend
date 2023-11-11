import auth from "./auth";
import banner from "./banner";
import chefs from "./chefs";
import inventory from "./inventory";
const resolvers = {
  Query: {
    verifyOtp : auth.verifyOtp,
    getInventoryItem: inventory.getItem,
    inventoryItems:inventory.getItems,
    banner: banner.carouselView,
    getchef :chefs.getChef,
    getchefs: chefs.getChefs,
    getMenu: chefs.getMenu,
  },
  Mutation: {
    checkPhonenSend: auth.checkPhonenSend,
    deleteinventoryItem: inventory.delItem,
    inventoryAdd: inventory.addNew,
    inventoryItem: inventory.editItem,
    liveToggle: inventory.liveToggle,
    carousel: banner.carouselMod,
    newchef: chefs.newChef,
    editchef: chefs.editChef,
    editMenu:chefs.editMenu,
  },
};

export default resolvers;
