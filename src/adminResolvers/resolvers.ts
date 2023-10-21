import auth from "./auth";
import inventory from "./inventory";
const resolvers = {
  Query: {
    verifyOtp : auth.verifyOtp,
    getInventoryItem: inventory.getItem,
    inventoryItems:inventory.getItems,
  },
  Mutation: {
    checkPhonenSend: auth.checkPhonenSend,
    deleteinventoryItem: inventory.delItem,
    inventoryAdd: inventory.addNew,
    inventoryItem: inventory.editItem,
  },
};

export default resolvers;
