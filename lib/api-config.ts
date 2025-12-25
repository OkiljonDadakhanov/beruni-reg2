/**
 * Centralized API configuration for olympcenter.uz API
 * Base API: https://api.olympcenter.uz/api/
 */

export const API_BASE_URL = "https://api.olympcenter.uz/api";

/**
 * API endpoints
 */
export const API_ENDPOINTS = {
  countries: `${API_BASE_URL}/countries/`,
  detailedRegistrations: `${API_BASE_URL}/detailed-registrations/`,
  winners: `${API_BASE_URL}/winners/`,
  mentors: `${API_BASE_URL}/mentors/`,
  news: `${API_BASE_URL}/news/`,
} as const;

/**
 * Get authentication headers for API requests
 */
export function getAuthHeaders(): HeadersInit {
  const headers: HeadersInit = {};

  // Add authentication if provided via environment variables
  // Support multiple authentication methods
  if (process.env.API_AUTH_TOKEN) {
    // Bearer token authentication
    headers["Authorization"] = `Bearer ${process.env.API_AUTH_TOKEN}`;
  } else if (process.env.API_KEY) {
    // API key authentication
    headers["X-API-Key"] = process.env.API_KEY;
  } else if (process.env.API_AUTH_HEADER && process.env.API_AUTH_VALUE) {
    // Custom header authentication
    headers[process.env.API_AUTH_HEADER] = process.env.API_AUTH_VALUE;
  }

  return headers;
}

/**
 * Build full API URL from endpoint path
 */
export function buildApiUrl(endpoint: string): string {
  // If endpoint already includes the base URL, return as is
  if (endpoint.startsWith("http")) {
    return endpoint;
  }
  
  // Remove leading slash if present
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;
  
  // Ensure endpoint ends with / if it's a path
  const finalEndpoint = cleanEndpoint.endsWith("/") ? cleanEndpoint : `${cleanEndpoint}/`;
  
  return `${API_BASE_URL}/${finalEndpoint}`;
}



