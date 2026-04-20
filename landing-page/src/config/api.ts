/**
 * Central API configuration.
 * All fetch calls should use this base URL instead of hardcoding localhost.
 * Set VITE_API_URL in your .env file (or deployment environment).
 */
const API_BASE_URL = import.meta.env.VITE_API_URL || "";

export const API_ENDPOINTS = {
  enquiries: `${API_BASE_URL}/api/enquiries`,
  packages: `${API_BASE_URL}/api/packages`,
  places: `${API_BASE_URL}/api/places`,
  upload: `${API_BASE_URL}/api/upload`,
  health: `${API_BASE_URL}/api/health`,
  auth: {
    login: `${API_BASE_URL}/api/auth/login`,
    register: `${API_BASE_URL}/api/auth/register`,
  },
};

export default API_BASE_URL;
