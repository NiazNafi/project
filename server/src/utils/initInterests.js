import { InterestModel } from '../models/interestModel.js';

const defaultInterests = [
  'programming',
  'design',
  'business',
  'marketing',
  'data-science',
  'languages'
];

export const initializeInterests = async () => {
  try {
    console.log('Initializing interests...');
    
    for (const interestName of defaultInterests) {
      const existingInterest = await InterestModel.findByName(interestName);
      if (!existingInterest) {
        await InterestModel.create(interestName);
        console.log(`Created interest: ${interestName}`);
      }
    }
    
    console.log('Interests initialization completed');
  } catch (error) {
    console.error('Error initializing interests:', error);
    throw error;
  }
};