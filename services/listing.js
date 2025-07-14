// services/listing.js
import api from '@/utils/axiosInstance';

/**
 * Fetch all listings from the backend.
 * @returns {Promise<Array>} List of all available listings.
 */
export const getAllListings = async () => {
  try {
    const response = await api.get('/listings/');
    return response.data;
  } catch (error) {
    console.error('Error fetching listings:', error);
    throw error;
  }
};

/**
 * Fetch a specific listing by its ID.
 * @param {number|string} id - ID of the listing to fetch.
 * @returns {Promise<Object>} Details of the listing.
 */
export const getListingById = async (id) => {
  try {
    const response = await api.get(`/listings/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching listing with ID ${id}:`, error);
    throw error;
  }
};
