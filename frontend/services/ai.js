import { donationAPI } from './api';

export const analyzeFood = async (imageUri) => {
  try {
    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'food.jpg',
    });

    const response = await donationAPI.analyzeFood(formData);
    return response.data;
  } catch (error) {
    console.error('AI analysis error:', error);
    throw error;
  }
};