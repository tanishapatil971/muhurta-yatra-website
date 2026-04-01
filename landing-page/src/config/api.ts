/**
 * Central API configuration.
 * All fetch calls should use this base URL instead of hardcoding localhost.
 * Set VITE_API_URL in your .env file (or deployment environment).
 */
const API_BASE_URL = import.meta.env.VITE_API_URL || "";

export const API_ENDPOINTS = {
  enquiries: `${API_BASE_URL}/api/enquiries`,
};

export default API_BASE_URL;
