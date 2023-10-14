import auth from "./auth";
import customer from "./customer";

const resolvers = {
  Query: {
    verifyOtp : auth.verifyOtp,
    getAddresses : customer.getAddresses,
  },
  Mutation: {
    checkPhonenSend: auth.checkPhonenSend,
  },
};

export default resolvers;
