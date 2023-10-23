import logger from "../logger";
import { GraphQLError } from 'graphql';
import { carousel } from "../schema/carousel";

type GalleryInput = {
    url?: string;
    id?: string;
    name?: string;
  };

const carouselMod = async (_:any, { id, payload }:{id:string, payload:GalleryInput[]}, {token}: {token:string}, ) =>{
    // if(token=='')
    //   throw new GraphQLError('Auth error');

    try {
        const newItem = await carousel.findByIdAndUpdate(id,{gallery:payload}, { new : true });
        return newItem;
      } catch (error) {
        logger.error(error);
        throw new GraphQLError('Problem in Updating banner');
      }
}
const carouselView = async (_:any, { id }:{id:string}, {token}: {token:string}, ) =>{
    // if(token=='')
    //   throw new GraphQLError('Auth error');

    try {
        const inst = await carousel.findById(id);
        return inst;
      } catch (error) {
        logger.error(error);
        throw new GraphQLError('Error in fetching');
      }
}

export default {
    carouselMod,
    carouselView
}

