import { InterestModel } from "../models/interestModel.js";

export const InterestController = {
    getAllInterests: async (req, res, next) => {
      try {
        
        const interests = await InterestModel.findAll();
        
      console.log("Fetched Interests:", interests);
        res.status(200).json(interests);
      } catch (error) {
        next(error); 
      }
    },
  
    
  };