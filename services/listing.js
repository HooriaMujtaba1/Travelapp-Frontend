// services/listing.js
import api from '@/utils/axiosInstance';

export const getAllListings = async () => {
  const response = await api.get('/listings/');
  return response.data;
};

export const getListingById = async (id) => {
  const response = await api.get(`/listings/${id}/`);
  return response.data;
};
