// Import the necessary function from the keys module
import { CLIENT_ID, CLIENT_SECRET } from "../keys.js";

// Define an asynchronous function to fetch an access token from the Spotify API
const getToken = async () => {
  // Construct the URL for the Spotify API token request
  const url = "https://accounts.spotify.com/api/token";
  // Construct the headers for the request, including the Authorization header with the encoded client ID and secret
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
  };
  // Construct the body for the request, including the grant type
  const body = "grant_type=client_credentials";
  // Make a POST request to the Spotify API token endpoint with the headers and body
  const response = await fetch(url, {
    method: "POST",
    headers,
    body,
  });
  // Parse the response as JSON and return the access token
  const data = await response.json();
  return data.access_token;
};

// Define an asynchronous function to fetch data from the Spotify API
export const fetchFromSpotify = async (url) => {
  // Fetch an access token from the Spotify API
  const token = await getToken();
  // Construct the headers for the request, including the Authorization header with the access token
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  // Make a GET request to the specified URL with the headers
  const response = await fetch(url, {
    headers,
  });
  // Throw an error if the request was not successful
  if (!response.ok) throw new Error("Spotify API request failed");
  // Parse the response as JSON and return the data
  return response.json();
};
