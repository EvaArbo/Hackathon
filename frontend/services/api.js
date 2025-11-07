import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const donationAPI = {
  createDonation: (donationData) => api.post('/donations', donationData),
  getDonations: (params) => api.get('/donations', { params }),
  claimDonation: (id) => api.post(`/donations/${id}/claim`),
};

export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
};

export default api;