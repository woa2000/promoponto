import { createClient } from "next-sanity";

/**
 * This client is used for fetching data during server-side rendering or on the client.
 * For server-side, CORS is not an issue.
 * For client-side, we enable CDN to avoid CORS issues in production.
 */
export const client = createClient({
  projectId: "mekkwlea",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true, // Set to true to use the CDN which avoids CORS issues
  perspective: "published",
});