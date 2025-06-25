import apiClient from './client';
import axios from 'axios';
export const getHelloMessage = async () => {
  try {
    const response = await apiClient.get('/hello');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};