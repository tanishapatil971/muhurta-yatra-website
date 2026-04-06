// Temporary Login Utility
// Invoke this from browser console: window.tempLogin("admin@example.com", "password123")
// It will log the user in and store the JWT token in localStorage.

import { API_ENDPOINTS } from "../config/api";

export const tempLogin = async (email?: string, password?: string) => {
  // Use default credentials if none provided
  const credentials = {
    email: email || "admin@example.com",
    password: password || "admin123"
  };

  try {
    // Note: The auth endpoint uses the base API URL which API_ENDPOINTS.enquiries helps extract
    const baseUrl = API_ENDPOINTS.enquiries.replace("/enquiries", "");
    const authUrl = `${baseUrl}/auth/login`;

    const res = await fetch(authUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const data = await res.json();

    if (res.ok && data.token) {
      localStorage.setItem("token", data.token);
      console.log("✅ Successfully logged in as admin!");
      console.log("Token stored in localStorage:", data.token);
      alert("Success: Logged in as admin. You can now access admin features.");
      return data;
    } else {
      console.error("❌ Login failed:", data.message || "Unknown error");
      alert("Error: " + (data.message || "Login failed"));
    }
  } catch (err) {
    console.error("❌ Login fetch error:", err);
  }
};

// Make it available on window for easy testing/utility
if (typeof window !== "undefined") {
  (window as any).tempLogin = tempLogin;
}
